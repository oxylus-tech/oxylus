import pytest

from django.conf import settings


@pytest.fixture
def image_000():
    return settings.STATIC_DIR / "image - 000.jpg"


@pytest.fixture
def preview_000():
    path = settings.STATIC_DIR / "image - 000 - preview.jpg"
    path.exists() and path.unlink()
    return path
