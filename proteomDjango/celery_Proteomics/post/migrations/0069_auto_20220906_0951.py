# Generated by Django 3.2 on 2022-09-06 09:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('post', '0068_auto_20220906_0903'),
    ]

    operations = [
        migrations.AddField(
            model_name='analysisinfomodel',
            name='finGO',
            field=models.CharField(blank=True, max_length=2000),
        ),
        migrations.AddField(
            model_name='getfinnetwork',
            name='finGO',
            field=models.CharField(blank=True, max_length=255),
        ),
    ]
