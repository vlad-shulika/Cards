import requests
import unittest
from cards.tests.common import Common

class TestPhrases(unittest.TestCase):

    def setUp(self):
        self._common = Common()
        self._language_id = self._common.create_object("languages", {"name": "русский"})["id"]

    def tearDown(self):
        del self._common

    def test_create_phrase(self):
        _payload = {"phrase": "Dog", "language": self._common.get_url_by_type_and_id("languages", self._language_id)}
        self._common.create_object("phrases", _payload)

    def test_get_phrase_by_url(self):
        _payload = {"phrase": "Dog", "language": self._common.get_url_by_type_and_id("languages", self._language_id)}
        r = self._common.create_object("phrases", _payload)
        url = r['response']["url"]
        r = requests.get(url)
        resp_data = r.json()
        self.assertEqual(url, resp_data["url"])
        self.assertEqual(_payload["phrase"], resp_data["phrase"])
        self.assertEqual(_payload["language"], resp_data["language"])

    def test_put_phrase(self):
        _payload = {"phrase": "Dog", "language": self._common.get_url_by_type_and_id("languages", self._language_id)}
        r = self._common.create_object("phrases", _payload)
        url = r['response']["url"]
        requests.put(url, {"phrase": "Test", "language": self._common.get_url_by_type_and_id("languages", self._language_id)})
        r = requests.get(url)
        self.assertEqual(r.json()["phrase"], "Test")

    def test_get_all_phrases(self):
        _payload = {"phrase": "Dog", "language": self._common.get_url_by_type_and_id("languages", self._language_id)}
        array_urls = []
        for i in range(0, 11):
            r = self._common.create_object("phrases", _payload)
            array_urls.append(r["response"]["url"])

        def get_all_phrases(i, server_address):
            dict_phrases = {}
            r = requests.get(server_address)
            resp_data = r.json()
            dict_phrases["page" + str(i)] = resp_data["results"]
            if resp_data["next"] != None:
                temp_dict, _ = get_all_phrases(i+1, resp_data["next"])
                dict_phrases.update(temp_dict)
            return dict_phrases, resp_data["count"]

        dict_phrases, count = get_all_phrases(1, self._common.get_url_by_type("phrases"))
        number_phrases = 0
        for key in dict_phrases:
            number_phrases += len(dict_phrases[key])
        self.assertEqual(number_phrases, count)

    def test_phrase_with_max_len(self):
        _payload = {"phrase": "Dog"*170, "language": self._common.get_url_by_type_and_id("languages", self._language_id)}
        r = self._common.create_object("phrases", _payload, False)
        self.assertEqual(400, r['status_code'])
