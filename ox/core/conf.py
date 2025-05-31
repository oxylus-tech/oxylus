from django.conf import settings


class Settings:
    """
    This class provide settings configuration with default values.

    Configuration keys are declared and document under subclass of this
    one as UPPERCASED attributes. This allows to document them.

    User can still import the class in ``settings.py`` in order to
    reuse already existing values.


    Example ``myapp.conf``

    .. code-block:: python

        from ox.core import conf

        __all__ = ("MyAppSettings", "app_settings")

        class MyAppSettings(conf.Settings):
            ALLOWED_TAGS = ["a", "b", "br"]
            \""" Tags allowed for this application. \"""
            SOME_VALUE = 123
            \""" Other documented setting. \"""

        # this is the actual instance used to retrieve settings
        app_settings = MyAppSettings("MYAPP")

    In project ``settings.py``:

    .. code-block:: python

        from myapp.settings import MyAppSettings

        MYAPP = {
            "ALLOWED_TAGS": [*MyAppSettings.ALLOWED_TAGS, "p"],
        }


    Usage:

    .. code-block:: python

        from myapp.conf import app_settings

        # Just print it out...
        print(app_settings.ALLOWED_TAGS, app_settings.SOME_VALUE)

    """

    def __init__(self, key, source=settings):
        self._overrides = getattr(source, key, None)

    def __getattribute__(self, name):
        if name[0] != "_" and name.isupper():
            overrides = object.__getattribute__(self, "_overrides")
            if overrides and name in overrides:
                return overrides[name]
        return object.__getattribute__(self, name)
