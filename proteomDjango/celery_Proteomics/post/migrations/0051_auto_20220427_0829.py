# Generated by Django 2.2.14 on 2022-04-27 08:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('post', '0050_auto_20220413_0737'),
    ]

    operations = [
        migrations.AddField(
            model_name='analysisinfomodel',
            name='proteincount',
            field=models.CharField(blank=True, max_length=2000),
        ),
        migrations.AddField(
            model_name='analysisinfomodel',
            name='pvfc',
            field=models.CharField(blank=True, max_length=2000),
        ),
        migrations.AlterField(
            model_name='analysisinfomodel',
            name='taskId2',
            field=models.CharField(blank=True, max_length=20000),
        ),
    ]
