# -*- coding: utf-8 -*-
# Generated by Django 1.11.10 on 2018-03-28 19:08
from __future__ import unicode_literals

from django.db import migrations
from django.db import models


class Migration(migrations.Migration):

    dependencies = [("content", "0007_auto_20180212_1155")]

    operations = [
        migrations.AddField(
            model_name="contentnode",
            name="coach_content",
            field=models.BooleanField(default=False),
        )
    ]
