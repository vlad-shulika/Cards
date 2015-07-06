from django.db import models
from django.utils.encoding import python_2_unicode_compatible
# Create your models here.
import operator


#@python_2_unicode_compatible
class Language(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return "%s" % self.name

#@python_2_unicode_compatible
class Phrase(models.Model):

    language = models.ForeignKey(Language)
    phrase = models.CharField(max_length=200)

    def __str__(self):
        return "Phrase: %s, Language: %s |" % (self.phrase, self.language.name)

class TranslateCard(models.Model):

    translations = models.ManyToManyField(Phrase)

    def __str__(self):
        return "Card <<%s>>\n" % (list(self.translations.all()))

    @staticmethod
    def find_all_translation_by_language(phrase, language):
        translation_list = phrase.translatecard_set.all()

        if not len(translation_list):
            return []

        all_cards = set(
            reduce(
                operator.add,
                [list(translation_card.translations.filter(language=language)) for translation_card in translation_list]
            )
        )
        cards = list(all_cards)
        return cards
