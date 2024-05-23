# Generated by Django 5.0.4 on 2024-05-22 22:35

import django.contrib.postgres.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("ponk", "0005_rename_auth_user_auth_method"),
    ]

    operations = [
        migrations.AlterField(
            model_name="user",
            name="avatar",
            field=models.URLField(
                default="https://cdn.intra.42.fr/product/image/995/Visuels_newsletter__51_.png"
            ),
        ),
        migrations.AlterField(
            model_name="user",
            name="level",
            field=models.PositiveIntegerField(default=0),
        ),
        migrations.AlterField(
            model_name="user",
            name="level_percentage",
            field=models.PositiveIntegerField(default=0),
        ),
        migrations.AlterField(
            model_name="user",
            name="skins",
            field=django.contrib.postgres.fields.ArrayField(
                base_field=models.CharField(default=[]), size=None
            ),
        ),
    ]