from django.core.exceptions import PermissionDenied
from rest_framework.renderers import BrowsableAPIRenderer


__all__ = ("AdminBrowsableAPIRenderer",)


class AdminBrowsableAPIRenderer(BrowsableAPIRenderer):
    """
    This class is used for browsable API views in order to deny
    access to non staff users.
    """

    def get_context(self, *args, **kwargs):
        request = args[2]["request"]
        if not request.user.is_authenticated or not request.user.is_staff:
            raise PermissionDenied("You're not allowed to access this page.")
        return super().get_context(*args, **kwargs)
