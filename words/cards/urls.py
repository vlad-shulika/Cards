__author__ = 'z4i'

from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.IndexView.as_view(), name='index'),
    url(r'^(?P<pk>[0-9]+)/$', views.DetailView.as_view(), name='detail'),
    url(r'^(?P<pk>[0-9]+)/translations/(?P<language>[a-zA-Z]+)/$', views.TranslationListView.as_view(), name='translation'),
    url(r'^new_card/$', views.new_card, name='new_card'),
]