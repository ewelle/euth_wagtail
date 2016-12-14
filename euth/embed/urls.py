from django.conf.urls import url
from static import embed_js

from . import views

urlpatterns = [
    url(r'',
        views.test_view, name='embed-test'),
    url(r'static/embed.js',
        embed_js, name='embed-script'),
]
