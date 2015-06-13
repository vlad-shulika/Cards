#!/usr/bin/env python
import os
import sys
from words import configure_web

if __name__ == "__main__":
    # assume that we run our web part by MAMP on 8888 port
    configure_web.set_rest_url('http://127.0.0.1:8000/')
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "words.settings")

    from django.core.management import execute_from_command_line

    execute_from_command_line(sys.argv)
