import psutil
import time
import pyttsx3
from win10toast import ToastNotifier
import threading
from twilio.rest import Client

# your authentication credentials of TWILIO account
account_sid = "AC271f24b224f4fddbc44de0d0cf814a38"
auth_token = "f0378bb87c984a34b58a69becd97d466"

client = Client(account_sid, auth_token)

toaster = ToastNotifier()
x = pyttsx3.init()
x.setProperty('rate', 130)
x.setProperty('volume', 8)


def show_notification(show_text):
    toaster.show_toast(show_text,
                       icon_path='battery.ico',
                       duration=10)
    while toaster.notification_active():
        time.sleep(0.5)


def msg():
    message = client.messages.create(
        # the msg you want to send
        body='This is a reminder that: "Your Laptop is fully Charged, Please go and plug out your charger"',
        from_="+18644773657",  # your Twilio phone number
        to="+916306123126",  # the phone no you want send the SMS to
    )
    print("SMS sent")


def monitor():
    while (True):
        time.sleep(10)
        battery = psutil.sensors_battery()
        plugged = battery.power_plugged
        percent = int(battery.percent)

        if percent == 100:
            if plugged == True:
                processThread = threading.Thread(target=show_notification, args=(
                    "Laptop Fully Charged",))
                processThread.start()
                x.say("Laptop is Fully Charged Please plug out the cable")
                msg()
                x.runAndWait()


if __name__ == "__main__":
    monitor()
