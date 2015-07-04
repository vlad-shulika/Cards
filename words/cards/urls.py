__author__ = 'z4i'

from django.conf.urls import url, include
from . import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'language', views.LanguageViewSet)
router.register(r'phrase', views.PhraseViewSet)
router.register(r'translation', views.TranslateCardViewSet)

urlpatterns = [
    url(r'^', include(router.urls)),
]
