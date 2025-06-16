from pathlib import Path

from django.conf import settings
from bleach import sanitizer

from ox.core import conf


class Settings(conf.Settings):
    ALLOWED_TAGS = [*sanitizer.ALLOWED_TAGS, "br", "p", "h1", "h2", "h3", "h4", "h5", "h6"]
    """ Allowed tags for the richtext sanitizer (as used by :py:class:`~.models.RichTextField`). """
    ALLOWED_ATTRIBUTES = [*sanitizer.ALLOWED_ATTRIBUTES]
    """ Allowed tag attributes for the richtext sanitizer (as used by :py:class:`~.models.RichTextField`). """
    ALLOWED_PROTOCOLS = [*sanitizer.ALLOWED_PROTOCOLS]
    """ Allowed url protocols for the richtext sanitizer (as used by :py:class:`~.models.RichTextField`). """

    STATIC_DIR = "ox_content/bundles"
    """ Directory in static where to store bundles. """
    TEMPLATE_DIR = "ox_content/bundles"
    """ Directory in templates where to store bundles. """

    @property
    def template_dir(self) -> Path:
        """Template directory path where to store bundle templates."""
        return Path(settings.BASE_DIR) / "templates" / self.TEMPLATE_DIR

    @classmethod
    def static_dir(self) -> Path:
        """Static directory path where to store bundles' statics."""
        return Path(settings.STATIC_DIR) / self.STATIC_DIR


ox_content_settings: Settings = Settings("OX_CONTENT")
"""
Settings used by ``ox_content`` application, using key ``OX_CONTENT``.
"""
