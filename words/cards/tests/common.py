import requests
import unittest


class ObjectHolder(object):

    def __init__(self, object_type, object_id):
        self.object_id = object_id
        self.object_type = object_type
        self.deleted = False

    def __eq__(self, other):
        return self.object_id == other.object_id and self.object_type == other.object_type

    def get_object_id(self):
        return self.object_id

    def get_object_type(self):
        return self.object_type

    def is_object_marked_as_deleted(self):
        return self.deleted

    def mark_as_deleted(self):
        self.deleted = True


class Common(object):
    headers = {'Content-Type': 'application/json'}
    server_address = "http://127.0.0.1:8000"

    def __init__(self):
        self._objects = []

    def __del__(self):
        for object_to_delete in filter(lambda x: not x.is_object_marked_as_deleted(), self._objects):
            self.delete_object(object_to_delete.get_object_type(), object_to_delete.get_object_id())

    def _check_type(self, type):
        if type not in ['languages', 'translations', 'phrases']:
            raise Exception('Type "{0}" is not supported'.format(type))

    def create_object(self, type, payload, check_status = True):
        self._check_type(type)
        _raw_response = requests.post(self.get_url_by_type(type), payload, Common.headers)

        if not check_status:
            return {'status_code': _raw_response.status_code}

        class CheckForStatus(unittest.TestCase):
            pass

        _check_for_status = CheckForStatus()
        _check_for_status.assertEqual(_raw_response.status_code, 201)

        _response = _raw_response.json()
        _url = _response["url"]
        _id = _url[_url.rfind("/") + 1:]
        self._objects.append(ObjectHolder(type, _id))
        return {'response': _response, 'id': _id, 'status_code': _raw_response.status_code}

    def delete_object(self, type, id):
        self._check_type(type)
        url = self.get_url_by_type_and_id(type, id)
        requests.delete(url)
        _object_to_mark_as_deleted = ObjectHolder(type, id)
        _found_object = filter(lambda x: x == _object_to_mark_as_deleted, self._objects)
        next(_found_object).mark_as_deleted()


    def get_url_by_type_and_id(self, type, id):
        self._check_type(type)
        return '{0}/{1}/{2}'.format(Common.server_address, type, id)

    def get_url_by_type(self, type):
        self._check_type(type)
        return '{0}/{1}'.format(Common.server_address, type)
