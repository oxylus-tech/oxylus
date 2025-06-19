from django.utils.html import strip_tags
from rest_framework import serializers

from ox.core.serializers import ModelSerializer

from . import models, mixins


__all__ = (
    "RichTextField",
    "StripCharField",
    "TemplatePackSerializer",
)


class RichTextField(mixins.RichTextFieldMixin, serializers.CharField):
    """Handles cleaning input HTML rich text content."""

    def to_internal_value(self, value):
        return self.clean(super().to_internal_value(value))


class StripCharField(serializers.CharField):
    """Strip HTML tags of provided input."""

    def to_internal_value(self, value):
        return strip_tags(value).strip()


class TemplatePackSerializer(ModelSerializer):
    template_dir = serializers.CharField()
    static_dir = serializers.CharField()

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        if request := self.context.get("request"):
            if not request.user.has_perm("ox_content.change_templatepack"):
                del self.fields["template_dir"]
                del self.fields["static_dir"]

    class Meta:
        model = models.TemplatePack
        fields = "__all__"
