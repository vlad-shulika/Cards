# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('cards', '0002_auto_20150526_1027'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='translationlist',
            name='translation',
        ),
        migrations.AddField(
            model_name='translationlist',
            name='translations',
            field=models.ManyToManyField(to='cards.Card'),
        ),
    ]
