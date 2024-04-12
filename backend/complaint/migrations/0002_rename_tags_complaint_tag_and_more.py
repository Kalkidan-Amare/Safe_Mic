# Generated by Django 5.0.4 on 2024-04-09 10:35

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('complaint', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='complaint',
            old_name='tags',
            new_name='tag',
        ),
        migrations.AlterUniqueTogether(
            name='complaint',
            unique_together={('tag', 'body')},
        ),
    ]