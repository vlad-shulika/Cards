from cards.models import *
from cards.serializers import LanguageSerializer, PhraseSerializer, TranslateCardSerializer
from rest_framework import viewsets
# Create your views here.

class LanguageViewSet(viewsets.ModelViewSet):
    queryset = Language.objects.all()
    serializer_class = LanguageSerializer

class PhraseViewSet(viewsets.ModelViewSet):
    queryset = Phrase.objects.all()
    serializer_class = PhraseSerializer

class TranslateCardViewSet(viewsets.ModelViewSet):
    queryset = TranslateCard.objects.all()
    serializer_class = TranslateCardSerializer

