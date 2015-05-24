from django.db import models

# Create your models here.

class Language(models.Model):
    name = models.CharField(max_length=100)

class Translation(models.Model):

    phrase = models.CharField(max_length=200)
    language = models.ForeignKey(Language)

class Card(models.Model):

    phrase = models.CharField(max_length=200)
    translations = models.ForeignKey(Translation)
    language = models.ForeignKey(Language)