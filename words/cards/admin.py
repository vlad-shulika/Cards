from django.contrib import admin

# Register your models here.
from .models import Phrase, TranslateCard, Language

admin.site.register([Phrase, TranslateCard, Language])