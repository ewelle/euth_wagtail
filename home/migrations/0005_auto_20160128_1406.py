# -*- coding: utf-8 -*-
# Generated by Django 1.9.1 on 2016-01-28 14:06
from __future__ import unicode_literals

from django.db import migrations
import wagtail.wagtailcore.blocks
import wagtail.wagtailcore.fields
import wagtail.wagtailimages.blocks


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0004_auto_20160128_1034'),
    ]

    operations = [
        migrations.AlterField(
            model_name='homepage',
            name='body_da',
            field=wagtail.wagtailcore.fields.StreamField([('heading', wagtail.wagtailcore.blocks.CharBlock(classname='full title', icon='title')), ('paragraph', wagtail.wagtailcore.blocks.TextBlock(icon='pilcrow')), ('image', wagtail.wagtailimages.blocks.ImageChooserBlock(icon='image')), ('info_block', wagtail.wagtailcore.blocks.StructBlock([(b'title', wagtail.wagtailcore.blocks.CharBlock(classname=b'full title')), (b'image', wagtail.wagtailimages.blocks.ImageChooserBlock(required=False)), (b'text', wagtail.wagtailcore.blocks.TextBlock()), (b'button', wagtail.wagtailcore.blocks.StructBlock([(b'internal_link', wagtail.wagtailcore.blocks.PageChooserBlock(required=False)), (b'external_link', wagtail.wagtailcore.blocks.URLBlock()), (b'link_text', wagtail.wagtailcore.blocks.TextBlock())], required=False)), (b'highlight', wagtail.wagtailcore.blocks.BooleanBlock(required=False))]))], blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='homepage',
            name='body_de',
            field=wagtail.wagtailcore.fields.StreamField([('heading', wagtail.wagtailcore.blocks.CharBlock(classname='full title', icon='title')), ('paragraph', wagtail.wagtailcore.blocks.TextBlock(icon='pilcrow')), ('image', wagtail.wagtailimages.blocks.ImageChooserBlock(icon='image')), ('info_block', wagtail.wagtailcore.blocks.StructBlock([(b'title', wagtail.wagtailcore.blocks.CharBlock(classname=b'full title')), (b'image', wagtail.wagtailimages.blocks.ImageChooserBlock(required=False)), (b'text', wagtail.wagtailcore.blocks.TextBlock()), (b'button', wagtail.wagtailcore.blocks.StructBlock([(b'internal_link', wagtail.wagtailcore.blocks.PageChooserBlock(required=False)), (b'external_link', wagtail.wagtailcore.blocks.URLBlock()), (b'link_text', wagtail.wagtailcore.blocks.TextBlock())], required=False)), (b'highlight', wagtail.wagtailcore.blocks.BooleanBlock(required=False))]))], blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='homepage',
            name='body_en',
            field=wagtail.wagtailcore.fields.StreamField([('heading', wagtail.wagtailcore.blocks.CharBlock(classname='full title', icon='title')), ('paragraph', wagtail.wagtailcore.blocks.TextBlock(icon='pilcrow')), ('image', wagtail.wagtailimages.blocks.ImageChooserBlock(icon='image')), ('info_block', wagtail.wagtailcore.blocks.StructBlock([(b'title', wagtail.wagtailcore.blocks.CharBlock(classname=b'full title')), (b'image', wagtail.wagtailimages.blocks.ImageChooserBlock(required=False)), (b'text', wagtail.wagtailcore.blocks.TextBlock()), (b'button', wagtail.wagtailcore.blocks.StructBlock([(b'internal_link', wagtail.wagtailcore.blocks.PageChooserBlock(required=False)), (b'external_link', wagtail.wagtailcore.blocks.URLBlock()), (b'link_text', wagtail.wagtailcore.blocks.TextBlock())], required=False)), (b'highlight', wagtail.wagtailcore.blocks.BooleanBlock(required=False))]))], null=True),
        ),
        migrations.AlterField(
            model_name='homepage',
            name='body_fr',
            field=wagtail.wagtailcore.fields.StreamField([('heading', wagtail.wagtailcore.blocks.CharBlock(classname='full title', icon='title')), ('paragraph', wagtail.wagtailcore.blocks.TextBlock(icon='pilcrow')), ('image', wagtail.wagtailimages.blocks.ImageChooserBlock(icon='image')), ('info_block', wagtail.wagtailcore.blocks.StructBlock([(b'title', wagtail.wagtailcore.blocks.CharBlock(classname=b'full title')), (b'image', wagtail.wagtailimages.blocks.ImageChooserBlock(required=False)), (b'text', wagtail.wagtailcore.blocks.TextBlock()), (b'button', wagtail.wagtailcore.blocks.StructBlock([(b'internal_link', wagtail.wagtailcore.blocks.PageChooserBlock(required=False)), (b'external_link', wagtail.wagtailcore.blocks.URLBlock()), (b'link_text', wagtail.wagtailcore.blocks.TextBlock())], required=False)), (b'highlight', wagtail.wagtailcore.blocks.BooleanBlock(required=False))]))], blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='homepage',
            name='body_it',
            field=wagtail.wagtailcore.fields.StreamField([('heading', wagtail.wagtailcore.blocks.CharBlock(classname='full title', icon='title')), ('paragraph', wagtail.wagtailcore.blocks.TextBlock(icon='pilcrow')), ('image', wagtail.wagtailimages.blocks.ImageChooserBlock(icon='image')), ('info_block', wagtail.wagtailcore.blocks.StructBlock([(b'title', wagtail.wagtailcore.blocks.CharBlock(classname=b'full title')), (b'image', wagtail.wagtailimages.blocks.ImageChooserBlock(required=False)), (b'text', wagtail.wagtailcore.blocks.TextBlock()), (b'button', wagtail.wagtailcore.blocks.StructBlock([(b'internal_link', wagtail.wagtailcore.blocks.PageChooserBlock(required=False)), (b'external_link', wagtail.wagtailcore.blocks.URLBlock()), (b'link_text', wagtail.wagtailcore.blocks.TextBlock())], required=False)), (b'highlight', wagtail.wagtailcore.blocks.BooleanBlock(required=False))]))], blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='homepage',
            name='body_sl',
            field=wagtail.wagtailcore.fields.StreamField([('heading', wagtail.wagtailcore.blocks.CharBlock(classname='full title', icon='title')), ('paragraph', wagtail.wagtailcore.blocks.TextBlock(icon='pilcrow')), ('image', wagtail.wagtailimages.blocks.ImageChooserBlock(icon='image')), ('info_block', wagtail.wagtailcore.blocks.StructBlock([(b'title', wagtail.wagtailcore.blocks.CharBlock(classname=b'full title')), (b'image', wagtail.wagtailimages.blocks.ImageChooserBlock(required=False)), (b'text', wagtail.wagtailcore.blocks.TextBlock()), (b'button', wagtail.wagtailcore.blocks.StructBlock([(b'internal_link', wagtail.wagtailcore.blocks.PageChooserBlock(required=False)), (b'external_link', wagtail.wagtailcore.blocks.URLBlock()), (b'link_text', wagtail.wagtailcore.blocks.TextBlock())], required=False)), (b'highlight', wagtail.wagtailcore.blocks.BooleanBlock(required=False))]))], blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='homepage',
            name='body_sv',
            field=wagtail.wagtailcore.fields.StreamField([('heading', wagtail.wagtailcore.blocks.CharBlock(classname='full title', icon='title')), ('paragraph', wagtail.wagtailcore.blocks.TextBlock(icon='pilcrow')), ('image', wagtail.wagtailimages.blocks.ImageChooserBlock(icon='image')), ('info_block', wagtail.wagtailcore.blocks.StructBlock([(b'title', wagtail.wagtailcore.blocks.CharBlock(classname=b'full title')), (b'image', wagtail.wagtailimages.blocks.ImageChooserBlock(required=False)), (b'text', wagtail.wagtailcore.blocks.TextBlock()), (b'button', wagtail.wagtailcore.blocks.StructBlock([(b'internal_link', wagtail.wagtailcore.blocks.PageChooserBlock(required=False)), (b'external_link', wagtail.wagtailcore.blocks.URLBlock()), (b'link_text', wagtail.wagtailcore.blocks.TextBlock())], required=False)), (b'highlight', wagtail.wagtailcore.blocks.BooleanBlock(required=False))]))], blank=True, null=True),
        ),
    ]