# Generated by Django 3.2.3 on 2021-05-15 18:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('materials', '0006_auto_20210515_1729'),
    ]

    operations = [
        migrations.AddField(
            model_name='vacancies',
            name='schedule',
            field=models.CharField(default='', max_length=64),
        ),
        migrations.DeleteModel(
            name='JobSchedule',
        ),
    ]
