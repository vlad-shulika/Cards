# coding=utf-8
import requests
import unittest
from cards.tests.common import Common


class TestTranslations(unittest.TestCase):

    def setUp(self):
        self._common = Common()
        self.ids_languages = []
        self.ids_languages.append(self._common.create_object("languages", {"name": "english"})["id"])
        self.ids_languages.append(self._common.create_object("languages", {"name": "русский"})["id"])
        self.ids_phrases = []

        def create_phrase_object(phrase, language_id):
            return self._common.create_object("phrases", {"phrase": phrase, "language": self._common.get_url_by_type_and_id("languages", self.ids_languages[language_id])})["id"]

        self.ids_phrases.append(create_phrase_object("Lock", 0))
        self.ids_phrases.append(create_phrase_object("Castle", 0))
        self.ids_phrases.append(create_phrase_object("Замок", 1))

        self.urls_cards = []

        def create_translation_object(phrase_id1, phrase_id2):
            payload = {
                "translations": [
                    self._common.get_url_by_type_and_id("phrases", self.ids_phrases[phrase_id1]),
                    self._common.get_url_by_type_and_id("phrases", self.ids_phrases[phrase_id2])
                ]
            }

            return self._common.create_object("translations", payload)["id"]

        self.urls_cards.append(create_translation_object(2, 0))
        self.urls_cards.append(create_translation_object(2, 1))

    def tearDown(self):
        del self._common

    def test_get_translations_for_phrase(self):
        url_phrase = self._common.get_url_by_type_and_id("phrases", self.ids_phrases[2])
        url_language = self._common.get_url_by_type_and_id("languages", self.ids_languages[1])

        def get_all_cards(server_address):
            list_cards = []
            r = requests.get(server_address)
            resp_data = r.json()
            list_cards.extend(resp_data["results"])
            if resp_data["next"] != None:
                temp_list = get_all_cards(resp_data["next"])
                list_cards.extend(temp_list)
            return list_cards

        list_cards = get_all_cards(self._common.get_url_by_type("translations"))

        list_urlsphrases_that_connect_urlphrase = []
        for card in list_cards:
            if url_phrase in card["translations"]:
                list_urlsphrases_that_connect_urlphrase.extend(card["translations"])

        set_url_that_connect_urlphrase = set(list_urlsphrases_that_connect_urlphrase)
        list_urlsphrases_that_connect_urlphrase = list(set_url_that_connect_urlphrase)

        list_dict_translations = []
        for url in list_urlsphrases_that_connect_urlphrase:
            r = requests.get(url)
            if r.json()["language"] == url_language:
                list_dict_translations.append(r.json())

        r = requests.get(self._common.get_url_by_type("phrases") + "?phrase_id=" + self.ids_phrases[2] + "&language_id="+self.ids_languages[1])
        self.assertListEqual(list_dict_translations, r.json()["results"])

    def test_get_translation_by_url(self):
        payload = {
            "translations": [
                self._common.get_url_by_type_and_id("phrases", self.ids_phrases[2]),
                self._common.get_url_by_type_and_id("phrases", self.ids_phrases[0])
            ]
        }
        _id = self._common.create_object("translations", payload)["id"]
        r = requests.get("http://127.0.0.1:8000/translations/" + _id)
        resp_data = r.json()
        self.assertIn(payload["translations"][0], resp_data["translations"])
        self.assertIn(payload["translations"][1], resp_data["translations"])
        self.assertEqual(self._common.get_url_by_type_and_id("translations", _id), resp_data["url"])

    def test_put_translation(self):
        payload = {
            "translations": [
                self._common.get_url_by_type_and_id("phrases", self.ids_phrases[2]),
                self._common.get_url_by_type_and_id("phrases", self.ids_phrases[0])
            ]
        }
        _id = self._common.create_object("translations", payload)["id"]
        requests.put(self._common.get_url_by_type_and_id("translations", _id), {"translations": self._common.get_url_by_type_and_id("phrases", self.ids_phrases[1])})
        r = requests.get(self._common.get_url_by_type_and_id("translations", _id))
        self.assertIn(self._common.get_url_by_type_and_id("phrases", self.ids_phrases[1]), r.json()["translations"])
