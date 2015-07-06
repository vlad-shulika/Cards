from cards.models import *
from cards.serializers import LanguageSerializer, PhraseSerializer, TranslateCardSerializer
from rest_framework import viewsets

class LanguageViewSet(viewsets.ModelViewSet):
    queryset = Language.objects.all()
    serializer_class = LanguageSerializer
    #lookup_field = 'id'

class PhraseViewSet(viewsets.ModelViewSet):
    queryset = Phrase.objects.all()
    serializer_class = PhraseSerializer

    def list(self, request, *args, **kwargs):
        if 'phrase_id' not in request.query_params or 'language_id' not in request.query_params:
            return super(PhraseViewSet, self).list(request, *args, **kwargs)

        _pharse_id = request.query_params['phrase_id']
        _language_id = request.query_params['language_id']

        try:
            _phrase_obj = Phrase.objects.get(id=_pharse_id)
            _language_obj = Language.objects.get(id=_language_id)
            _cards = TranslateCard.find_all_translation_by_language(_phrase_obj, _language_obj)
        except:
            _cards = []

        self.queryset = Phrase.objects.filter(id__in = [card.id for card in _cards])
        return super(PhraseViewSet, self).list(request, *args, **kwargs)

class TranslateCardViewSet(viewsets.ModelViewSet):
    queryset = TranslateCard.objects.all()
    serializer_class = TranslateCardSerializer

