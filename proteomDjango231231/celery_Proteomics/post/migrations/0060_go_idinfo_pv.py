# Generated by Django 2.2.14 on 2022-06-23 08:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('post', '0059_auto_20220611_1836'),
    ]

    operations = [
        migrations.AddField(
            model_name='go_idinfo',
            name='pv',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]
