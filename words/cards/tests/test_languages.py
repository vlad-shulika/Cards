import requests
import unittest
from cards.tests.common import Common

class TestLanguages(unittest.TestCase):

    def setUp(self):
        self._common = Common()
        self.payload = {"name": "english"}

    def tearDown(self):
        del self._common

    def test_create_language(self):
        _response = self._common.create_object("languages", self.payload)

    def test_get_language_by_url(self):
        _response = self._common.create_object("languages", self.payload)
        url = _response['response']["url"]
        r = requests.get(url)
        resp_data = r.json()
        self.assertEqual(url, resp_data["url"])
        self.assertEqual(self.payload["name"], resp_data["name"])

    def test_put_language(self):
        _response = self._common.create_object("languages", self.payload)
        url = _response['response']["url"]
        requests.put(url, {"name": "Test"})
        r = requests.get(url)
        self.assertEqual(r.json()["name"], "Test")

    def test_get_all_languages(self):
        array_urls = []
        for i in range(0, 11):
            _response = self._common.create_object("languages", self.payload)
            array_urls.append(_response['response']["url"])

        def get_all_languages(i, server_address):
            dict_languages = {}
            r = requests.get(server_address)
            resp_data = r.json()
            dict_languages["page" + str(i)] = resp_data["results"]
            if resp_data["next"] != None:
                temp_dict, _ = get_all_languages(i+1, resp_data["next"])
                dict_languages.update(temp_dict)
            return dict_languages, resp_data["count"]

        dict_languages, count = get_all_languages(1, self._common.get_url_by_type('languages'))
        number_languages = 0
        for key in dict_languages:
            number_languages += len(dict_languages[key])
        self.assertEqual(number_languages, count)

    def test_language_with_max_len(self):
        payload = {"name": "english"*500}
        _response = self._common.create_object("languages", payload, False)
        self.assertEqual(400, _response['status_code'])
