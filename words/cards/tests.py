# This Python file uses the following encoding: utf-8

from django.test import TestCase
from .models import *

class TranslationListMethodTests(TestCase):
    def test_find_all_translation_card_by_language(self):
        l1 = Language.objects.create(name="Русский")
        l2 = Language.objects.create(name="English")
        l3 = Language.objects.create(name="Czech")

        c1 = Card.objects.create(phrase="Привет", language=l1)
        c2 = Card.objects.create(phrase="Hello", language=l2)
        c3 = Card.objects.create(phrase="Hi", language=l2)
        c4 = Card.objects.create(phrase="Ahoi", language=l3)
        c5 = Card.objects.create(phrase="Yo", language=l2)

        t1 = TranslationList.objects.create(card=c1)
        t1.translations.add(c2)
        t1.translations.add(c3)
        t1.translations.add(c4)
        t1.translations.add(c5)
        t1.save()
        cards = TranslationList.find_all_translation_by_language(c1,l2)
        self.assertListEqual(list(cards), [c2, c3, c5], "Database method returns something incorrect!")
        pass