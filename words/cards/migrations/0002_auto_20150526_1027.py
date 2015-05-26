# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('cards', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='TranslationList',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
            ],
        ),
        migrations.RemoveField(
            model_name='translation',
            name='language',
        ),
        migrations.RemoveField(
            model_name='card',
            name='translations',
        ),
        migrations.DeleteModel(
            name='Translation',
        ),
        migrations.AddField(
            model_name='translationlist',
            name='card',
            field=models.ForeignKey(related_name='original', to='cards.Card'),
        ),
        migrations.AddField(
            model_name='translationlist',
            name='translation',
            field=models.ForeignKey(related_name='translation', to='cards.Card'),
        ),
    ]
