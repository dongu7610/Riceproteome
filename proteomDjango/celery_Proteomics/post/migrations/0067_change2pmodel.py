# Generated by Django 3.2 on 2022-08-29 09:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('post', '0066_auto_20220829_0652'),
    ]

    operations = [
        migrations.CreateModel(
            name='Change2pModel',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Change2p', models.CharField(blank=True, max_length=200)),
                ('username', models.CharField(blank=True, max_length=255)),
                ('proj', models.CharField(blank=True, max_length=255)),
                ('projecttitle', models.CharField(blank=True, max_length=255)),
            ],
        ),
    ]
