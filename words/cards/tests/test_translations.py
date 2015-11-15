# coding=utf-8
import requests
import unittest

class TestTranslations(unittest.TestCase):
    headers = {'Content-Type': 'application/json'}
    server_address = "http://127.0.0.1:8000"

    def create_object(self, type, payload):
        r = requests.post(TestTranslations.server_address + "/" + type, payload, TestTranslations.headers)
        self.assertEqual(r.status_code, 201)
        url = r.json()["url"]
        return url[url.rfind("/")+1:]

    def test_create_object(self):
        ids = self.create_object("languages", {"name": "english"})
        self.assertNotEqual(None, ids)
        self.assertNotEqual("", ids)
        self.assertGreater(int(ids), 0)

    def setUp(self):
        self.ids_languages = []
        self.ids_languages.append(self.create_object("languages", {"name": "english"}))
        self.ids_languages.append(self.create_object("languages", {"name": "русский"}))
        self.ids_phrases = []
        self.ids_phrases.append(self.create_object("phrases", {"phrase": "Lock", "language": "http://127.0.0.1:8000/languages/"+self.ids_languages[0]}))
        self.ids_phrases.append(self.create_object("phrases", {"phrase": "Castle", "language": "http://127.0.0.1:8000/languages/"+self.ids_languages[0]}))
        self.ids_phrases.append(self.create_object("phrases", {"phrase": "Замок", "language": "http://127.0.0.1:8000/languages/"+self.ids_languages[1]}))
        self.urls_cards = []
        payload = {"translations": ["http://127.0.0.1:8000/phrases/"+self.ids_phrases[2],"http://127.0.0.1:8000/phrases/"+self.ids_phrases[0]]}
        self.urls_cards.append(self.create_object("translations", payload))
        payload = {"translations": ["http://127.0.0.1:8000/phrases/"+self.ids_phrases[2],"http://127.0.0.1:8000/phrases/"+self.ids_phrases[1]]}
        self.urls_cards.append(self.create_object("translations", payload))

    def tearDown(self):
        for id_language in self.ids_languages:
            requests.delete("http://127.0.0.1:8000/languages/" + id_language)
        for id_phrase in self.ids_phrases:
            requests.delete("http://127.0.0.1:8000/phrases/" + id_phrase)
        for id_translation in self.urls_cards:
            requests.delete("http://127.0.0.1:8000/translations/" + id_translation)

    def test_get_translations_for_phrase(self):
        url_phrase = "http://127.0.0.1:8000/phrases" + "/" + self.ids_phrases[2]
        url_language = "http://127.0.0.1:8000/languages" + "/" + self.ids_languages[1]

        def get_all_cards(server_address):
            list_cards = []
            r = requests.get(server_address)
            resp_data = r.json()
            list_cards.extend(resp_data["results"])
            if resp_data["next"] != None:
                temp_list = get_all_cards(resp_data["next"])
                list_cards.extend(temp_list)
            return list_cards

        list_cards = get_all_cards(TestTranslations.server_address+"/translations")

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

        r = requests.get("http://127.0.0.1:8000/phrases?phrase_id=" + self.ids_phrases[2] + "&language_id="+self.ids_languages[1])
        self.assertListEqual(list_dict_translations, r.json()["results"])