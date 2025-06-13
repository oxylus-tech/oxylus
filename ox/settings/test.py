from .dev import *

INSTALLED_APPS = [
    "tests.app",
] + INSTALLED_APPS


STATIC_DIR = BASE_DIR / "tests" / "static"
MEDIA_ROOT = STATIC_DIR / "media"
