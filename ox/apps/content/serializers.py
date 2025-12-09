from django.utils.html import strip_tags
from rest_framework import serializers

from ox.core.serializers import ModelSerializer

from . import models, mixins


__all__ = (
    "RichTextField",
    "StripCharField",
    # ----
    "DynamicBlockSerializer",
    "VariableInfoSerializer",
    "RendererSerializer",
    # ----
    "TemplatePackSerializer",
)


# ---- Reusable serializer/fields ----
class RichTextField(mixins.RichTextFieldMixin, serializers.CharField):
    """Handles cleaning input HTML rich text content."""

    def to_internal_value(self, value):
        return self.clean(super().to_internal_value(value))


class StripCharField(serializers.CharField):
    """Strip HTML tags of provided input."""

    def to_internal_value(self, value):
        return strip_tags(value).strip()


# ---- Dynamic Blocks ----
class DynamicBlockSerializer(serializers.Serializer):
    """Serialize a :py:class:`~.blocks.DynamicBlock`."""

    name = serializers.CharField()
    group = serializers.CharField()
    label = serializers.CharField()
    icon = serializers.CharField()
    inline = serializers.BooleanField()


class VariableInfoSerializer(serializers.Serializer):
    label = serializers.CharField()
    description = serializers.CharField()


class RendererSerializer(serializers.Serializer):
    """Serialize a :py:class:`~.renderers.Renderer` informations.

    Note: variables are rendered as a list with extra value ``name``.
    """

    blocks = DynamicBlockSerializer(many=True)

    def to_representation(self, instance):
        data = super().to_representation(instance)

        vars_ser = VariableInfoSerializer(instance.variables.values(), many=True)
        vars = []
        for name, info in zip(instance.variables.keys(), vars_ser.data):
            vars.append({"name": name, **info})
        data["variables"] = vars
        return data


# ---- Models ----
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
