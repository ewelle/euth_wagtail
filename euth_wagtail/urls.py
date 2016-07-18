from django.conf import settings
from django.conf.urls import include, patterns, url
from django.conf.urls.i18n import i18n_patterns
from django.contrib import admin
from django.views.generic import TemplateView
from django.views.i18n import javascript_catalog
from wagtail.wagtailadmin import urls as wagtailadmin_urls
from wagtail.wagtailcore import urls as wagtail_urls
from wagtail.wagtaildocs import urls as wagtaildocs_urls

from euth.comments import urls as comments_urls
from euth.ideas import urls as ideas_urls
from euth.organisations import urls as organisations_urls
from euth.projects import urls as projects_urls
from euth.user_management import urls as user_urls
from search import urls as search_urls

js_info_dict = {
    'packages': ('euth.comments',),
}

urlpatterns = [
    url(r'^django-admin/', include(admin.site.urls)),
    url(r'^admin/', include(wagtailadmin_urls)),
    url(r'^documents/', include(wagtaildocs_urls)),
    url(r'^api/', include(comments_urls)),
    url(r'', include(user_urls)),
]

urlpatterns += i18n_patterns(
    url(r'', include(user_urls)),
    url(r'^orgs/', include(organisations_urls)),
    url(r'^projects/', include(projects_urls)),
    url(r'^ideas/', include(ideas_urls)),
    url(r'^adhocracy/', TemplateView.as_view(template_name="activate.html"), name="adhocracy"),
    url(r'^search/', include(search_urls)),
    url(r'^jsi18n/$', javascript_catalog, js_info_dict, name='javascript-catalog'),
    url(r'', include(wagtail_urls)),
)


if settings.DEBUG:
    from django.conf.urls.static import static
    from django.contrib.staticfiles.urls import staticfiles_urlpatterns
    from django.views.generic import TemplateView

    # Serve static and media files from development server
    urlpatterns += staticfiles_urlpatterns()
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
