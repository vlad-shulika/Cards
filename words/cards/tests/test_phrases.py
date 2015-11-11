import requests
import unittest

class TestPhrases(unittest.TestCase):
    headers = {'Content-Type': 'application/json'}
    server_address = "http://127.0.0.1:8000/phrases"
    payload = {"phrase": "Dog", "language": "http://127.0.0.1:8000/languages/1"}

    def test_create_phrase(self):
        r = requests.post(TestPhrases.server_address, json=TestPhrases.payload, headers=TestPhrases.headers)
        self.assertEqual(r.status_code, 201)
        requests.delete(r.json()["url"])

    def test_get_phrase_by_url(self):
        r = requests.post(TestPhrases.server_address, json=TestPhrases.payload, headers=TestPhrases.headers)
        url = r.json()["url"]
        r = requests.get(url)
        resp_data = r.json()
        self.assertEqual(url, resp_data["url"])
        self.assertEqual(TestPhrases.payload["phrase"], resp_data["phrase"])
        self.assertEqual(TestPhrases.payload["language"], resp_data["language"])
        requests.delete(url)

    def test_put_phrase(self):
        r = requests.post(TestPhrases.server_address, json=TestPhrases.payload, headers=TestPhrases.headers)
        url = r.json()["url"]
        requests.put(url, {"phrase": "Test", "language": "http://127.0.0.1:8000/languages/1"})
        r = requests.get(url)
        self.assertEqual(r.json()["phrase"], "Test")
        requests.delete(url)

    def test_get_all_phrases(self):
        array_urs = []
        for i in range(0, 11):
            r = requests.post(TestPhrases.server_address, json=TestPhrases.payload, headers=TestPhrases.headers)
            array_urs.append(r.json()["url"])

        def get_all_phrases(i, server_address):
            dict_phrases = {}
            r = requests.get(server_address)
            resp_data = r.json()
            dict_phrases["page" + str(i)] = resp_data["results"]
            if resp_data["next"] != None:
                temp_dict, _ = get_all_phrases(i+1, resp_data["next"])
                dict_phrases.update(temp_dict)
            return dict_phrases, resp_data["count"]

        dict_phrases, count = get_all_phrases(1, TestPhrases.server_address)
        number_phrases = 0
        for key in dict_phrases:
            number_phrases += len(dict_phrases[key])
        self.assertEqual(number_phrases, count)

        for url in array_urs:
            requests.delete(url)

    def test_pharase_with_max_len(self):
        #for i in range(353, 420):
        #    requests.delete(TestPhrases.server_address + "/" + str(i))
        payload = {"phrase": "Dog"*70, "language": "http://127.0.0.1:8000/languages/1"}
        r = requests.post(TestPhrases.server_address, json=payload, headers=TestPhrases.headers)
        self.assertEqual(400, r.status_code)