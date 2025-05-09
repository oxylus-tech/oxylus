from rest_framework import serializers


__all__ = (
    "RelatedField",
    "ModelSerializer",
)


class RelatedField(serializers.SlugRelatedField):
    """Provide related field based on uuid."""

    def __init__(self, **kwargs):
        kwargs.setdefault("slug_field", "uuid")
        super().__init__(**kwargs)


class ModelSerializer(serializers.ModelSerializer):
    id = serializers.UUIDField(source="uuid", read_only=True)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        if "uuid" in self.fields:
            del self.fields["uuid"]

    def pop_nested(self, validated_data):
        if nested := getattr(self.Meta, "nested", None):
            result = {}
            for field_name in nested:
                field = self.fields[field_name]
                source = field.source
                value = validated_data.pop(source, None)
                if value:
                    result[field] = value
            return result
        return {}

    # TODO: update existing ones
    def save_nested(self, obj, nested):
        for field, values in nested.items():
            model_field = getattr(self.Meta.model, field.source)
            for val in values:
                if "id" in val:
                    del val["id"]
                val[model_field.field.name] = obj

            # just drop older ones
            getattr(obj, field.source).all().delete()
            field.create(values)

    def create(self, validated_data):
        nested = self.pop_nested(validated_data)
        instance = super().create(validated_data)
        self.save_nested(instance, nested)
        return instance

    def update(self, instance, validated_data):
        nested = self.pop_nested(validated_data)
        instance = super().update(instance, validated_data)
        self.save_nested(instance, nested)
        return instance

    class Meta:
        fields = ("id",)
