# -*- coding: utf-8 -*-
# Generated by Django 1.10 on 2016-09-01 18:14
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('portfolioapp', '0006_about'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='about',
            options={'verbose_name': 'about description', 'verbose_name_plural': 'about'},
        ),
    ]
