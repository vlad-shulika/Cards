import requests
import unittest

class Common(object):
    headers = {'Content-Type': 'application/json'}
    server_address = "http://127.0.0.1:8000"

    def _check_type(self, type):
        if type not in ['languages', 'translations', 'phrases']:
            raise Exception('Type "{0}" is not supported'.format(type))

    def create_object(self, type, payload, check_status = True):
        class CheckForStatus(unittest.TestCase):
            pass

        self._check_type(type)
        r = requests.post(Common.server_address + "/" + type, payload, Common.headers)
        if check_status:
            _check_for_status = CheckForStatus()
            _check_for_status.assertEqual(r.status_code, 201)
        else:
            return {'status_code': r.status_code}

        response = r.json()
        url = response["url"]
        return {'response': response, 'id': url[url.rfind("/")+1:], 'status_code': r.status_code}

    def delete_object(self, type, id):
        self._check_type(type)
        url = self.get_url_by_type_and_id(type, id)
        requests.delete(url)

    def get_url_by_type_and_id(self, type, id):
        self._check_type(type)
        return '{0}/{1}/{2}'.format(Common.server_address, type, id)

    def get_url_by_type(self, type):
        self._check_type(type)
        return '{0}/{1}'.format(Common.server_address, type)
