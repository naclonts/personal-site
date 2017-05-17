from django.views.debug import technical_500_response
import sys
from django.conf import settings

class UserBasedExceptionMiddleware(object):
    def __init__(self, get_response):
        self.get_response = get_response

    def process_exception(self, request, exception):
        if request.user.is_superuser:
            return technical_500_response(request, *sys.exc_info())

    def __call__(self, request):
        response = self.get_response(request)
        return response
