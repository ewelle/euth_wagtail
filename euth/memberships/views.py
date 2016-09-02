from django.http import Http404
from django.shortcuts import redirect
from django.views import generic
from rules.compat import access_mixins as mixin

from euth.projects import models as prj_models

from . import models


class RequestView(mixin.LoginRequiredMixin, generic.DetailView):
    """
    Displays membership request if it exists or allows to create one.
    """
    template_name = 'euth_memberships/request_detail.html'
    model = models.Request
    slug_field = 'project__slug'
    slug_url_kwarg = 'project_slug'
    context_object_name = 'join_request'
    fields = []

    def get_queryset(self):
        return self.model.objects.filter(creator=self.request.user)

    def post(self, request, *args, **kwargs):
        user = request.user
        project = self.project
        models.Request.objects.request_membership(project, user)
        return redirect(self.request.path)

    def get_object(self, queryset=None):
        try:
            return super().get_object(queryset)
        except Http404:
            return None

    @property
    def project(self):
        project_slug = self.kwargs[self.slug_url_kwarg]
        return prj_models.Project.objects.get(slug=project_slug)