from django.http import HttpResponse
from django.views.decorators.clickjacking import xframe_options_exempt


@xframe_options_exempt
def test_view(request):
    return HttpResponse("This page is safe to load in a frame on any site.")
