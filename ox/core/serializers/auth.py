from django.apps import apps
from django.contrib.auth.models import User, Group, Permission
from django.contrib.contenttypes.models import ContentType
from rest_framework import serializers


__all__ = ("PermissionSerializer", "GroupSerializer", "UserSerializer", "PasswordSerializer")


class ContentTypeSerializer(serializers.ModelSerializer):
    app = serializers.CharField(source="app_label")
    model = serializers.CharField()
    app_verbose = serializers.SerializerMethodField()
    model_verbose = serializers.SerializerMethodField()

    class Meta:
        model = ContentType
        fields = ["id", "app", "model", "app_verbose", "model_verbose"]

    def get_app_verbose(self, obj):
        app = apps.get_app_config(obj.app_label)
        return getattr(app, "verbose_name", None) or app.name

    def get_model_verbose(self, obj):
        cl = obj.model_class()
        return cl._meta.verbose_name.capitalize()


class PermissionSerializer(serializers.ModelSerializer):
    label = serializers.SerializerMethodField()
    content_type_id = serializers.PrimaryKeyRelatedField(source="content_type", queryset=ContentType.objects.all())

    class Meta:
        model = Permission
        fields = ["id", "name", "codename", "content_type_id", "label"]

    def get_label(self, obj):
        return f"{obj.content_type.app_label}.{obj.codename}"


class GroupSerializer(serializers.ModelSerializer):
    permissions_id = serializers.PrimaryKeyRelatedField(
        source="permissions", many=True, queryset=Permission.objects.all()
    )

    class Meta:
        model = Group
        fields = ["id", "name", "permissions_id"]


class UserSerializer(serializers.ModelSerializer):
    permissions_id = serializers.PrimaryKeyRelatedField(
        source="user_permissions", many=True, queryset=Permission.objects.all()
    )
    all_permissions = serializers.SerializerMethodField()
    groups_id = serializers.PrimaryKeyRelatedField(source="groups", many=True, queryset=Group.objects.all())

    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "last_name",
            "first_name",
            "email",
            "is_superuser",
            "permissions_id",
            "all_permissions",
            "groups_id",
        ]

    def get_all_permissions(self, obj):
        return list(obj.get_all_permissions())


class PasswordSerializer(serializers.Serializer):
    password = serializers.CharField()
