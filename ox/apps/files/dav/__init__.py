from wsgidav.wsgidav_app import WsgiDAVApp
from . import middleware, provider


# WSGIDAV config
dav_config = {
    # TODO: DJANGO SETTINGS
    "host": "0.0.0.0",
    "port": 8080,
    "provider_mapping": {
        "/": provider.DjangoDAVProvider(),
    },
    "http_authenticator": {
        "domain_controller": middleware.DjangoDomainController,
        "accept_basic": True,
        "accept_digest": False,
        "default_to_digest": False,
    },
    "simple_dc": {"user_mapping": {}},  # fallback, not used
}

# Wrap with Django auth middleware
dav_app = WsgiDAVApp(dav_config)
# dav_app = middleware.CapsMiddleware(dav_app)
# dav_app = middleware.DjangoAuthMiddleware(dav_app)
