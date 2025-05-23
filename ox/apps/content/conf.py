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


ox_content_settings: Settings = Settings("OX_CONTENT")
"""
Settings used by ``ox_content`` application, using key ``OX_CONTENT``.
"""
