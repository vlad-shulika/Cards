"""
WSGI config for words project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/1.8/howto/deployment/wsgi/
"""

import os

from django.core.wsgi import get_wsgi_application
import configure_web

# assume that we run our web part by apache on 80 port as VHost rest.wordssticker.tk
configure_web.set_rest_url('http://rest.wordssticker.tk/')

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "words.settings")

application = get_wsgi_application()
