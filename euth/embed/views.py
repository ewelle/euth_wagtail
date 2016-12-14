from django.http import HttpResponse
from django.views.decorators.clickjacking import xframe_options_exempt


@xframe_options_exempt
def test_view(request):
    text = '<script src="static/embed.js" type="text/javascript"></script>\
        <body>I\'m inside my body.</body>'
    return HttpResponse(text)
