# Generated by Django 3.1 on 2020-08-24 08:33

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0006_auto_20200822_0706'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='playlistvideo',
            options={'ordering': ['playlist__name', 'position']},
        ),
    ]
