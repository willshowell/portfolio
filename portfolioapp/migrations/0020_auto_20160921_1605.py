# -*- coding: utf-8 -*-
# Generated by Django 1.10 on 2016-09-21 16:05
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('portfolioapp', '0019_auto_20160921_1408'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='image',
            options={'ordering': ['-priority']},
        ),
    ]
