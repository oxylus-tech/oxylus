from django.core.exceptions import PermissionDenied, ValidationError
from ox.core import exceptions


def test_exception_handler_with_permissiondenied():
    resp = exceptions.exception_handler(PermissionDenied("denied"), {})
    assert resp.data["detail"].code == "permission_denied"


def test_exception_handler_with_validationerror():
    resp = exceptions.exception_handler(ValidationError({"name": "error"}), {})
    assert resp.data["name"]
