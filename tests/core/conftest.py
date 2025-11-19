from copy import copy

from django.apps import apps
from django.test import RequestFactory
import pytest

from ox.assets.base import Assets

# TODO: use parent conftest req_factory
request_factory = RequestFactory()
"""Request Factory used among different tests."""


@pytest.fixture
def assets():
    app = apps.get_app_config("ox_core")
    return copy(app.assets)


@pytest.fixture
def nested(assets):
    return next(a for a in assets.dependencies if isinstance(a, Assets))
