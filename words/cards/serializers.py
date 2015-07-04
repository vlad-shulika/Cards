from rest_framework import serializers
from cards.models import Language, Phrase, TranslateCard

class LanguageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Language
        #fields = ('url', 'id', 'name', )

class PhraseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Phrase
        #fields = ('url', 'language', 'phrase')

class TranslateCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = TranslateCard
        #fields = ('url', 'translations')
