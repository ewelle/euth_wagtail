from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'test/',
        views.test_view, name='embed-test'),
]
