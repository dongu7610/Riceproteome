# Generated by Django 2.2.14 on 2022-02-17 08:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('post', '0030_deletemodels'),
    ]

    operations = [
        migrations.AddField(
            model_name='protein_calcul',
            name='taskId',
            field=models.CharField(blank=True, max_length=200),
        ),
    ]
