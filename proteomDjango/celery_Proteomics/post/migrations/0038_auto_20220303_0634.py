# Generated by Django 2.2.14 on 2022-03-03 06:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('post', '0037_auto_20220302_0554'),
    ]

    operations = [
        migrations.AddField(
            model_name='networks_idinfo',
            name='name_info',
            field=models.CharField(blank=True, max_length=2550, null=True),
        ),
        migrations.AddField(
            model_name='networks_idinfo',
            name='targets',
            field=models.CharField(blank=True, max_length=25500, null=True),
        ),
        migrations.AlterField(
            model_name='networks_idinfo',
            name='mask_id',
            field=models.CharField(blank=True, max_length=2550, null=True),
        ),
        migrations.AlterField(
            model_name='networks_idinfo',
            name='name',
            field=models.CharField(blank=True, max_length=2550, null=True),
        ),
    ]
