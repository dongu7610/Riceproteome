# Generated by Django 2.2.14 on 2022-02-14 15:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('post', '0026_auto_20220214_1123'),
    ]

    operations = [
        migrations.AddField(
            model_name='protein_calcultask',
            name='analyinfo',
            field=models.CharField(blank=True, max_length=128, null=True),
        ),
    ]
