from django.contrib.auth import authenticate


from wsgidav.dc.base_dc import BaseDomainController


class DjangoDomainController(BaseDomainController):
    """
    WSGIDAV domain controller that delegates auth to Django.
    """

    def __init__(self, wsgidav_app=None, config=None, realm_name="DjangoDAVRealm"):
        super().__init__(wsgidav_app, config)
        self.realm_name = realm_name

    def basic_auth_user(self, realmname, username, password, environ):
        """Return True if credentials are valid (Basic Auth)."""
        if environ.get("django.user"):
            return True

        user = authenticate(username=username, password=password)
        if user and user.is_active:
            environ["django.user"] = user
            return True
        return False

    def get_domain_realm(self, environ, realmname):
        """Return realm for WSGIDAV. Just return a string."""
        return self.realm_name

    def supports_http_digest_auth(self):
        """We only support Basic Auth."""
        return False

    def require_authentication(self, realmname, environ):
        """
        Always require authentication.
        """
        return True

    def authorize(self, realmname, environ, username, password):
        """
        Called by WSGIDAV to check credentials.
        Return True if valid.
        """
        user = authenticate(username=username, password=password)
        if user and user.is_active:
            # Attach user to environ for later use in provider
            environ["django.user"] = user
            return True
        return False
