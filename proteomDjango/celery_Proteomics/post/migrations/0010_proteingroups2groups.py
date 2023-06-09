# Generated by Django 3.1.3 on 2021-12-10 02:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('post', '0009_fileinfomodel_whole'),
    ]

    operations = [
        migrations.CreateModel(
            name='proteinGroups2groups',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('proteinids', models.CharField(blank=True, max_length=128, null=True)),
                ('majorityproteinids', models.CharField(blank=True, max_length=128, null=True)),
                ('fastaheaders', models.CharField(blank=True, max_length=128, null=True)),
                ('numberofproteins', models.CharField(blank=True, max_length=128, null=True)),
                ('peptides', models.CharField(blank=True, max_length=128, null=True)),
                ('uniquepeptides', models.CharField(blank=True, max_length=128, null=True)),
                ('sequencecoveragep', models.CharField(blank=True, max_length=128, null=True)),
                ('moldotweightkda', models.CharField(blank=True, max_length=128, null=True)),
                ('qhvalue', models.CharField(blank=True, max_length=128, null=True)),
                ('score', models.CharField(blank=True, max_length=128, null=True)),
                ('idsfrondevi', models.CharField(blank=True, max_length=128, null=True)),
                ('evidenceids', models.CharField(blank=True, max_length=128, null=True)),
                ('valuess', models.CharField(blank=True, max_length=5000, null=True)),
                ('proj', models.CharField(blank=True, max_length=128, null=True)),
            ],
            options={
                'db_table': 'pgssql',
            },
        ),
    ]
