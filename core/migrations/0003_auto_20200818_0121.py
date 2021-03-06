# Generated by Django 3.1 on 2020-08-18 00:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0002_auto_20200817_0032'),
    ]

    operations = [
        migrations.AlterField(
            model_name='historicalvideo',
            name='link',
            field=models.URLField(blank=True, help_text='For example, this can be the IMDB page URL of the video.', null=True, verbose_name='Link'),
        ),
        migrations.AlterField(
            model_name='video',
            name='link',
            field=models.URLField(blank=True, help_text='For example, this can be the IMDB page URL of the video.', null=True, verbose_name='Link'),
        ),
    ]
