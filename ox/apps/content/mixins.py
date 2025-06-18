import bleach

from .conf import ox_content_settings


__all__ = ("RichTextFieldMixin",)


class RichTextFieldMixin:
    """
    Mixin class used in order to clean richtext input using
    :py:attr:`~.conf.ox_content_settings`.

    It uses bleach, and provided attributes reflects bleach's ``clean()`` settings.
    """

    allowed_tags = ox_content_settings.ALLOWED_TAGS
    """ Allowed HTML tags inside the content. """
    allowed_attributes = ox_content_settings.ALLOWED_ATTRIBUTES
    """ Allowed tags attributes. """
    allowed_protocols = ox_content_settings.ALLOWED_PROTOCOLS
    """ Allowed protocols. """
    allowed_styles = ox_content_settings.ALLOWED_STYLES

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
                tags=self.allowed_tags,
                attributes=self.allowed_attributes,
                protocols=self.allowed_protocols,
            )
        )
