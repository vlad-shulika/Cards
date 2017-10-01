from rest_framework import serializers
from cards.models import Language, Phrase, TranslateCard


class LanguageSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Language
        fields = '__all__'
        ordering = ['-id']


class PhraseSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Phrase
        fields = '__all__'
        ordering = ['-id']


class TranslateCardSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = TranslateCard
        fields = '__all__'
        ordering = ['-id']
