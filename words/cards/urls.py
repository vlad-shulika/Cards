__author__ = 'z4i'

from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^(?P<card_id>[0-9]+)/$', views.detail, name='detail'),
    url(r'^(?P<card_id>[0-9]+)/translations/(?P<language>[a-zA-Z]+)/$', views.translation, name='translation'),
]