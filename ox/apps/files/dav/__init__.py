from wsgidav.wsgidav_app import WsgiDAVApp
from ..conf import ox_files_settings
from . import middleware, provider


# WSGIDAV config
dav_config = {
    "host": ox_files_settings.WEBDAV_HOST,
    "port": ox_files_settings.WEBDAV_PORT,
    "provider_mapping": {
        "/": provider.DjangoDAVProvider(),
    },
    "http_authenticator": {
        "domain_controller": middleware.DjangoDomainController,
        "accept_basic": True,
        "accept_digest": False,
        "default_to_digest": False,
    },
    "verbose": 1,
}

# Wrap with Django auth middleware
_dav_app = WsgiDAVApp(dav_config)


def dav_app(environ, start_response):
    dest = environ.get("HTTP_DESTINATION")
    if dest:
        environ["HTTP_DESTINATION"] = dest.replace("webdav://", "http://")
    return _dav_app(environ, start_response)
