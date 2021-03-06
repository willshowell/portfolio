# -*- coding: utf-8 -*-
# Generated by Django 1.10 on 2016-09-01 01:57
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('portfolioapp', '0003_auto_20160901_0121'),
    ]

    operations = [
        migrations.AddField(
            model_name='project',
            name='project_description',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='project',
            name='project_url',
            field=models.URLField(blank=True, max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='project',
            name='source_url',
            field=models.URLField(blank=True, max_length=100, null=True),
        ),
    ]
