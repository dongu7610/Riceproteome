# Generated by Django 2.2.14 on 2022-02-14 11:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('post', '0021_auto_20220214_1104'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='protein_calcul',
            name='auto_id',
        ),
        migrations.AddField(
            model_name='protein_calcul',
            name='id',
            field=models.AutoField(auto_created=True, default=1, primary_key=True, serialize=False, verbose_name='ID'),
            preserve_default=False,
        ),
    ]