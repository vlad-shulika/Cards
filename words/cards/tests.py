# This Python file uses the following encoding: utf-8
import random

from django.test import TestCase
from .models import *


class CardTests(TestCase):
    def generate_random_language(self):
        sequence = [chr(i+65) for i in range(26)]
        random_language_name = ''.join([random.choice(sequence) for _ in range(20)])
        return Language.objects.create(name=random_language_name)

    def generate_random_phrase(self, language):
        sequence = [chr(i+65) for i in range(26)]
        random_phrase = ''.join([random.choice(sequence) for _ in range(20)])
        return Phrase.objects.create(phrase=random_phrase, language=language)

    def generate_random_card(self, phrases, limit):
        card_phrases = [random.choice(phrases) for _ in range(limit)]
        card = TranslateCard.objects.create()

        for card_phrase in card_phrases:
            card.translations.add(card_phrase)

        card.save()
        return card

    def test_many_to_many(self):
        """
            Test covers functionality of generation phrases and translation cards
            + covers method find_all_translation_by_language
            tags: not stable due to use randomizer
        """
        languages = [self.generate_random_language() for _ in range(10)]
        phrases = [self.generate_random_phrase(random.choice(languages)) for _ in range(100)]
        [self.generate_random_card(phrases, 50) for _ in range(100)]

        translations = TranslateCard.find_all_translation_by_language(phrases[0], languages[0])
        self.assertTrue(len(translations) != 0, "didn't find anything")
