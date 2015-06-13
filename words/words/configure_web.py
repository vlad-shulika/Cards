import json
import os

__author__ = 'z4i'

REST_URL_INIT = False

def set_rest_url(url):
    global REST_URL_INIT
    if REST_URL_INIT:
        return

    current_path = os.path.dirname(os.path.realpath(__file__))
    path_of_web = current_path + '/../web/js'
    web_configuration_json_file = "rest.json"
    full_path = path_of_web + "/" + web_configuration_json_file

    model = {
        'rest_url' : url
    }

    with open(full_path, mode='w') as f:
        f.write( json.dumps(model))
        global REST_URL_INIT
        REST_URL_INIT = True
