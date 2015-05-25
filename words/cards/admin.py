from django.contrib import admin

# Register your models here.
from .models import Card, TranslationList, Language

admin.site.register([Card, TranslationList, Language])