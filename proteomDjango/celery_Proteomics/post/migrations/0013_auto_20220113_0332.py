# Generated by Django 3.1.3 on 2022-01-13 03:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('post', '0012_linkget_projectinfomodel'),
    ]

    operations = [
        migrations.AddField(
            model_name='fileinfomodel',
            name='destxt',
            field=models.CharField(default=0, max_length=255),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='fileinfomodel',
            name='projecttitle',
            field=models.CharField(default=0, max_length=255),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='uploadfilemodel',
            name='destxt',
            field=models.CharField(default=1, max_length=255),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='uploadfilemodel',
            name='projecttitle',
            field=models.CharField(default='exit', max_length=255),
            preserve_default=False,
        ),
    ]
