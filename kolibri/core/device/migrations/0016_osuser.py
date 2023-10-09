# -*- coding: utf-8 -*-
# Generated by Django 1.11.29 on 2022-04-26 21:31
from __future__ import unicode_literals

import django.db.models.deletion
from django.conf import settings
from django.db import migrations
from django.db import models


class Migration(migrations.Migration):

    dependencies = [
        ("kolibriauth", "0019_collection_no_mptt"),
        ("device", "0015_syncqueue_no_fk"),
    ]

    operations = [
        migrations.CreateModel(
            name="OSUser",
            fields=[
                (
                    "user",
                    models.OneToOneField(
                        on_delete=django.db.models.deletion.CASCADE,
                        primary_key=True,
                        related_name="os_user",
                        serialize=False,
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
                ("os_username", models.CharField(db_index=True, max_length=64)),
            ],
        ),
    ]
