from django.db import models
from django.utils.encoding import python_2_unicode_compatible
# Create your models here.

@python_2_unicode_compatible
class Language(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return "%s" % self.name

@python_2_unicode_compatible
class Card(models.Model):

    phrase = models.CharField(max_length=200)
    language = models.ForeignKey(Language)

    def __str__(self):
        return "Phrase: %s, Language: %s" % (self.phrase, self.language)

class TranslationList(models.Model):

    card = models.ForeignKey(Card, related_name="original")
    translations = models.ManyToManyField(Card)

    @staticmethod
    def find_all_translation_by_language(card, language):
        translation_list = TranslationList.objects.filter(card=card)
        if len(translation_list) > 1:
            raise TranslationList.MultipleObjectsReturned()
        if len(translation_list) == 0:
            raise TranslationList.DoesNotExist()

        cards = translation_list[0].translations.filter(language=language)
        return cards

    def __str__(self):
        return "Card <<%s>>" % (self.card)