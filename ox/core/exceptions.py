from django.core import exceptions
from rest_framework import views, exceptions as d_exceptions


__all__ = "exception_handler"


def exception_handler(exc, context):
    """Handle django exceptions..."""
    if isinstance(exc, exceptions.PermissionDenied):
        exc = d_exceptions.PermissionDenied(detail=str(exc))
    elif isinstance(exc, exceptions.ValidationError):
        exc = d_exceptions.ValidationError(detail=exc.message_dict)
    return views.exception_handler(exc, context)
