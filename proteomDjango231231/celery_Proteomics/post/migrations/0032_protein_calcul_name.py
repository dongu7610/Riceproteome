# Generated by Django 2.2.14 on 2022-02-18 05:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('post', '0031_protein_calcul_taskid'),
    ]

    operations = [
        migrations.AddField(
            model_name='protein_calcul',
            name='name',
            field=models.CharField(default=0, max_length=100),
            preserve_default=False,
        ),
    ]
