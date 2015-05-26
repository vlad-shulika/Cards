from django.core.urlresolvers import reverse
from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse, Http404, HttpResponseRedirect
from django.template import RequestContext
from django.views import generic
from .models import *
# Create your views here.

def index(request):
    cards = Card.objects.all()
    languages = Language.objects.all()
    context = RequestContext(request, {
        'cards': cards,
        'languages' : languages
    })
    return render(request, 'cards/index.html', context)

def detail(request, card_id):
    card = get_object_or_404(Card, pk=card_id)

    context = RequestContext(request, {
        'card' : card
    })
    return render(request, 'cards/card.html', context)

def translation(request, card_id, language):
    return HttpResponse("You are looking for translation for card id %d for %s language" % (int(card_id), language))


def new_card(request):
    language = request.POST['language']
    phrase = request.POST['phrase']
    language_object = get_object_or_404(Language, pk=language)
    try:
        card = Card(phrase=phrase, language=language_object)
    except:
        raise Http404("Can't create card object")

    card.save()

    return HttpResponseRedirect(reverse('cards:detail', args=(card.id,)))


class DetailView(generic.DetailView):
    model = Card
    template_name = 'cards/card.html'


class TranslationListView(generic.ListView):
    template_name = 'cards/index.html'
    context_object_name = 'translations'

    def get_queryset(self):
        return TranslationList.objects.all()


class IndexView(generic.ListView):
    template_name = 'cards/index.html'
    context_object_name = 'cards'

    def get_queryset(self):
        return Card.objects.all()