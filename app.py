from flask import Flask, render_template, redirect, url_for, send_file, request
from imports.ErrAutoSearch import main_func
from werkzeug.utils import secure_filename
from flask_socketio import SocketIO, emit
import os

UPLOAD_FOLDER = os.path.dirname(os.path.abspath(__file__))
ALLOWED_EXTENSIONS = {'py'}

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def messageRecived():
    print('message was received!!!')


@app.route('/')
def index():
    return render_template('landingPage.html')


@app.route('/autoErrCheck')
def fileupload():
    return render_template('stackOverflow.html')


@app.route('/websiteBlocker')
def websiteBlocker():
    return render_template('websiteBlocker.html')


@app.route('/search', methods=['GET', 'POST'])
def search():
    if request.method == 'POST':
        if 'file' not in request.files:
            print('No file attached in request')
            return redirect('/dashboard')
        file = request.files['file']
        if file.filename == '':
            print('No file selected')
            return redirect('/')
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            result = main_func()
            print(result)
            return render_template('stackOverflow.html', result=result)
    return redirect('/autoErrCheck')


@app.route('/download')
def download_file():
    path = "blocker.zip"
    return send_file(path, as_attachment=True)


@app.route('/devchat')
def grpchat():
    return render_template('devChat.html')


@socketio.on('my event')
def handle_my_custom_event(json):
    #print('recived my event: ' + str(json))
    socketio.emit('my response', json, callback=messageRecived)


if __name__ == '__main__':
    socketio.run(app)
    # app.run(debug=True)
    # app.run()
