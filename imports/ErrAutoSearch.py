import shlex
import requests
from subprocess import Popen, PIPE

# for now test the script by running the command python ErrAutoSearch.py

resultArray = []


def execute_and_return(cmd):
    args = shlex.split(cmd)
    proc = Popen(args, stdout=PIPE, stderr=PIPE)
    out, err = proc.communicate()
    return out, err


def make_request(error):
    print("Searching for "+error)
    resp = requests.get("https://api.stackexchange.com/" +
                        "2.2/search?order=desc&tagged=python&sort=activity&intitle={}&site=stackoverflow".format(error))
    return resp.json()


def get_urls(json_dict):
    url_list = []
    count = 0
    for i in json_dict['items']:
        if i["is_answered"]:
            url_list.append(i["link"])
        count += 1
        if count == len(i) or count == 3:
            break
    import webbrowser
    for i in url_list:
        webbrowser.open(i)


def autoSearch():
    out, err = execute_and_return("python test.py")
    error_message = err.decode("utf-8").strip().split("\r\n")[-1]
    resultArray.append(error_message)
    print(resultArray)
    if error_message:
        filter_out = error_message.split(":")
        print(filter_out)
        print(filter_out[0])
        json1 = make_request(filter_out[0])
        json2 = make_request(filter_out[1])
        json = make_request(error_message)
        get_urls(json1)
        get_urls(json2)
        get_urls(json)
    else:
        resultArray.append("There is no Error in your script!!")
        print("No errors")
    return resultArray


def main_func():
    result = autoSearch()
    return result
