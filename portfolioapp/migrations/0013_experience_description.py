# -*- coding: utf-8 -*-
# Generated by Django 1.10 on 2016-09-06 19:09
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('portfolioapp', '0012_project_technologies'),
    ]

    operations = [
        migrations.AddField(
            model_name='experience',
            name='description',
            field=models.TextField(blank=True),
        ),
    ]
