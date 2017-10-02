import requests
import unittest
from cards.tests.common import Common

class TestLanguages(unittest.TestCase):
    payload = {"name": "english"}
    _common = Common()

    def test_create_language(self):
        _id = self._common.create_object("languages", self.payload)
        self._common.delete_object("languages", _id)

    def test_get_language_by_url(self):
        r = requests.post(TestLanguages.server_address, json=TestLanguages.payload, headers=TestLanguages.headers)
        url = r.json()["url"]
        r = requests.get(url)
        resp_data = r.json()
        self.assertEqual(url, resp_data["url"])
        self.assertEqual(TestLanguages.payload["name"], resp_data["name"])
        requests.delete(url)

    def test_put_language(self):
        r = requests.post(TestLanguages.server_address, json=TestLanguages.payload, headers=TestLanguages.headers)
        url = r.json()["url"]
        requests.put(url, {"name": "Test"})
        r = requests.get(url)
        self.assertEqual(r.json()["name"], "Test")
        requests.delete(url)

    def test_get_all_languages(self):
        array_urs = []
        for i in range(0, 11):
            r = requests.post(TestLanguages.server_address, json=TestLanguages.payload, headers=TestLanguages.headers)
            array_urs.append(r.json()["url"])

        def get_all_languages(i, server_address):
            dict_languages = {}
            r = requests.get(server_address)
            resp_data = r.json()
            dict_languages["page" + str(i)] = resp_data["results"]
            if resp_data["next"] != None:
                temp_dict, _ = get_all_languages(i+1, resp_data["next"])
                dict_languages.update(temp_dict)
            return dict_languages, resp_data["count"]

        dict_languages, count = get_all_languages(1, TestLanguages.server_address)
        number_languages = 0
        for key in dict_languages:
            number_languages += len(dict_languages[key])
        self.assertEqual(number_languages, count)

        for url in array_urs:
            requests.delete(url)

    def test_language_with_max_len(self):
        payload = {"name": "english"*30}
        r = requests.post(TestLanguages.server_address, json=payload, headers=TestLanguages.headers)
        self.assertEqual(400, r.status_code)
