# Generated by Django 3.2 on 2022-11-30 05:57

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('proteom', '0002_data'),
    ]

    operations = [
        migrations.DeleteModel(
            name='FileList',
        ),
        migrations.DeleteModel(
            name='PPI_proteome',
        ),
        migrations.DeleteModel(
            name='projectsamples',
        ),
    ]
