# Generated by Django 2.2.14 on 2022-02-14 17:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('post', '0027_protein_calcultask_analyinfo'),
    ]

    operations = [
        migrations.AddField(
            model_name='protein_calcul',
            name='projidtitle',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]
