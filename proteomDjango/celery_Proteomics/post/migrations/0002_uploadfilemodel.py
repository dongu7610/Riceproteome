# Generated by Django 3.1.3 on 2021-12-07 04:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('post', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='UploadFileModel',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('description', models.CharField(max_length=255)),
                ('files', models.FileField(null=True, upload_to='')),
                ('upload_at', models.DateTimeField(auto_now=True)),
            ],
        ),
    ]
