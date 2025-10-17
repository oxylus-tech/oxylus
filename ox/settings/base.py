"""Django settings for ox.

For more information on this file, see
https://docs.djangoproject.com/en/5.0/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/5.0/ref/settings/
"""

import os
import sys
from pathlib import Path

from dynaconf import Dynaconf

# ---- Dynaconf
BASE_DIR = Path(__file__).resolve().parent.parent.parent
OX = {"SETTINGS_DIR": BASE_DIR / "conf"}
ENV = os.environ.get("OX_ENV", "default")

settings = Dynaconf(
    environments=True,
    # We provide defaults
    settings_file=[
        Path(__file__).resolve().parent / "default.yaml",
    ],
    includes=[
        OX["SETTINGS_DIR"] / "*",
        OX["SETTINGS_DIR"] / ".*",
        "/etc/oxylus/apps/*",
        "/etc/oxylus/conf.d/*",
        "/etc/oxylus/conf.d/.*",
    ],
    merge_enabled=True,
    ENVVAR_PREFIX_FOR_DYNACONF="OX",
    ENV_SWITCHER_FOR_DYNACONF="OX_ENV",
    BASE_DIR=BASE_DIR,
    OX=OX,
)
globals().update(settings.as_dict())

# ensure BASE_DIR is a path when provided by yaml settings
BASE_DIR = Path(BASE_DIR)

if plugins := getattr(settings, "PLUGINS_APPS", None):
    INSTALLED_APPS = plugins + INSTALLED_APPS

# ---- Forced values
ROOT_URLCONF = "ox.urls"
ASGI_APPLICATION = "ox.asgi.application"
WSGI_APPLICATION = "ox.wsgi.application"

USE_I18N = True
USE_L10N = True
USE_TZ = True
DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# Note: we use a generic name to be agnostic with frontend applications
LANGUAGE_COOKIE_NAME = "lang"

TASKS = {"default": {"BACKEND": "django_tasks.backends.database.DatabaseBackend"}}


# ---- Oxylus
if settings_dir := OX.get("SETTINGS_DIR"):
    OX["SETTINGS_DIR"] = Path(settings_dir)
else:
    OX["SETTINGS_DIR"] = BASE_DIR / "conf"
