# Generated by Django 2.2.14 on 2022-04-27 08:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('post', '0051_auto_20220427_0829'),
    ]

    operations = [
        migrations.AddField(
            model_name='searchnetwork',
            name='proteincount',
            field=models.CharField(blank=True, max_length=2000),
        ),
        migrations.AddField(
            model_name='searchnetwork',
            name='pvfc',
            field=models.CharField(blank=True, max_length=2000),
        ),
    ]
