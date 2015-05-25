from django.db import models
from django.utils.encoding import python_2_unicode_compatible
# Create your models here.

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
    translation = models.ForeignKey(Card, related_name="translation")

    def __str__(self):
        return "Card <<%s>> Translation <<%s>>" % (self.card, self.translation)