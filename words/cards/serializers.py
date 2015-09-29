from rest_framework import serializers
from cards.models import Language, Phrase, TranslateCard


class LanguageSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Language


class PhraseSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Phrase


class TranslateCardSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = TranslateCard
