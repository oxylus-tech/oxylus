from rest_framework import serializers

from ox.core.serializers import ModelSerializer, RelatedField

from . import models, mixins


__all__ = (
    "RichTextField",
    "TemplatePackSerializer",
    "ContentSerializer",
)


class RichTextField(mixins.RichTextFieldMixin, serializers.CharField):
    """Handles cleaning input HTML rich text content."""

    def to_internal_value(self, value):
        return self.to_python(super().to_internal_value(value))


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


class ContentSerializer(ModelSerializer):
    # flag = serializers.CharField()
    template_pack = RelatedField(queryset=models.TemplatePack.objects.all())
    content = RichTextField()

    class Meta:
        model = models.Content
        fields = "__all__"
