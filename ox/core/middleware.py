import urllib
from django.conf import settings


class BaseMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        return self.get_response(request)


class I18nMiddleware(BaseMiddleware):
    """Provide localization cookies used by client-side application."""

    def __call__(self, request):
        response = super().__call__(request)
        if True or not request.COOKIES.get(settings.LANGUAGE_COOKIE_NAME):
            accept = urllib.parse.quote_plus(request.headers.get("Accept-Language", "en").split(";")[0])
            response.set_cookie(settings.LANGUAGE_COOKIE_NAME, accept)
        return response


class OxylusMiddleware(I18nMiddleware):
    """Shorthand used to provide all Oxylus' middlewares."""

    pass
