from django.conf import settings
from django.db.models.functions import Lower
from django.contrib.auth.models import User, Group, Permission
from django.contrib.contenttypes.models import ContentType
from django.utils import translation

from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import DjangoModelPermissions

from .. import serializers
from .core import LoginMixin


__all__ = ("ConfViewSet", "AccountViewSet", "ContentTypeViewSet", "PermissionViewSet", "GroupViewSet", "UserViewSet")


class ConfViewSet(viewsets.ViewSet):

    @action(methods=["POST"], detail=False, url_path="set-language")
    def set_language(self, request):
        lang = request.data.get("language")
        translation.activate(lang)
        response = Response(data={"language": lang})
        response.set_cookie(settings.LANGUAGE_COOKIE_NAME, lang)
        return response


class AccountViewSet(LoginMixin, viewsets.GenericViewSet):
    serializer_class = serializers.UserSerializer
    credentials_serializer_class = serializers.PasswordLoginSerializer

    @action(detail=False, methods=["POST"])
    def login(self, request):
        serializer = self.get_credentials_serializer(data=request.data)
        user = self.proceed_login(request, serializer)
        if not user:
            return Response({"password": [self.login_failed_message]}, status=status.HTTP_403_FORBIDDEN)

        serializer = self.get_serializer(user)
        return Response({"messages": [self.get_welcome_message(user)], "user": serializer.data})


def _prefetch_lookups(prefix=""):
    """Provide prefetch lookup of related permissions."""
    return [prefix + "permissions", prefix + "permissions__content_type"]


class ContentTypeViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ContentType.objects.all()
    serializer_class = serializers.ContentTypeSerializer
    permission_classes = [DjangoModelPermissions]
    pagination_class = None


class PermissionViewSet(viewsets.ModelViewSet):
    queryset = Permission.objects.all().select_related("content_type")
    serializer_class = serializers.PermissionSerializer
    permission_classes = [DjangoModelPermissions]
    pagination_class = None


class GroupViewSet(viewsets.ModelViewSet):
    queryset = (
        Group.objects.all()
        .prefetch_related(
            *_prefetch_lookups(),
        )
        .order_by(Lower("name"))
    )
    serializer_class = serializers.GroupSerializer
    permission_classes = [DjangoModelPermissions]
    filterset_fields = {"id": ["in"], "user__id": ["exact"]}
    search_fields = [
        "name",
    ]


class UserViewSet(viewsets.ModelViewSet):
    queryset = (
        User.objects.all()
        .prefetch_related(
            *_prefetch_lookups("user_"),
            *_prefetch_lookups("groups__"),
        )
        .order_by("last_name", "first_name")
    )
    serializer_class = serializers.UserSerializer
    permission_classes = [DjangoModelPermissions]
    filterset_fields = {"id": ["in"], "groups__id": ["exact", "in"]}
    search_fields = ["username", "email", "last_name", "first_name"]
    ordering_fields = ["id", "username", "email", "last_name", "first_name"]

    @action(detail=True, methods=["POST"])
    def password(self, request, pk):
        # TODO
        if request.user.pk != pk and not request.user.has_perm("auth.change_user"):
            return Response({}, status=status.HTTP_403_FORBIDDEN)

        user = self.get_object()
        serializer = serializers.PasswordSerializer(data=request.data)
        if serializer.is_valid():
            user.set_password(serializer.validated_data["password"])
            user.save()
            return Response({})
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
