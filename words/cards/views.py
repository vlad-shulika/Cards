from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse
from django.template import RequestContext
from .models import *
# Create your views here.

def index(request):
    cards = Card.objects.all()
    context = RequestContext(request, {
        'cards': cards
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