import bleach
from django.db import models

from .conf import ox_content_settings


__all__ = ("RichTextField",)


class RichTextField(models.TextField):
    """
    Provide rich text value, ensuring input text is cleaned based on
    :py:attr:`~.conf.ox_content_settings`.

    It uses bleach, and provided attributes reflects bleach's ``clean()`` settings.

    Note though that strings are not marked as safe. This is up to the
    user to do so.
    """

    allowed_tags = ox_content_settings.OX_CONTENT["ALLOWED_TAGS"]
    """ Allowed HTML tags inside the content. """
    allowed_attributes = ox_content_settings.OX_CONTENT["ALLOWED_ATTRIBUTES"]
    """ Allowed tags attributes. """
    allowed_protocols = ox_content_settings.OX_CONTENT["ALLOWED_PROTOCOLS"]
    """ Allowed protocols. """

    def __init__(self, *args, allowed_tags=None, allowed_attributes=None, allowed_protocols=None, **kwargs):
        if allowed_tags is not None:
            self.allowed_tags = allowed_tags
        if allowed_attributes is not None:
            self.allowed_attributes = allowed_attributes
        if allowed_protocols is not None:
            self.allowed_protocols = allowed_protocols
        super().__init__(*args, **kwargs)

    def to_python(self, value):
        return super().to_python(
            bleach.clean(
                value,
                tags=self.ALLOWED_TAGS,
                attributes=self.ALLOWED_ATTRIBUTES,
                protocols=self.ALLOWED_PROTOCOLS,
            )
        )
