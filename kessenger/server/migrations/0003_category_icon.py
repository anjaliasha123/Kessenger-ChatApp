# Generated by Django 5.1.6 on 2025-02-06 23:10

import server.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('server', '0002_alter_server_description'),
    ]

    operations = [
        migrations.AddField(
            model_name='category',
            name='icon',
            field=models.FileField(blank=True, null=True, upload_to=server.models.category_icon_upload_path),
        ),
    ]
