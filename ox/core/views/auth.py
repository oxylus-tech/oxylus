from django.contrib.auth.models import User, Group, Permission
from django.contrib.contenttypes.models import ContentType

from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import DjangoModelPermissions

from ..serializers import auth


__all__ = ("ContentTypeViewSet", "PermissionViewSet", "GroupViewSet", "UserViewSet")


def _prefetch_lookups(prefix=""):
    """Provide prefetch lookup of related permissions."""
    return [prefix + "permissions", prefix + "permissions__content_type"]


class ContentTypeViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ContentType.objects.all()
    serializer_class = auth.ContentTypeSerializer
    permission_classes = [DjangoModelPermissions]
    pagination_class = None


class PermissionViewSet(viewsets.ModelViewSet):
    queryset = Permission.objects.all().select_related("content_type")
    serializer_class = auth.PermissionSerializer
    permission_classes = [DjangoModelPermissions]
    pagination_class = None


class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all().prefetch_related(
        *_prefetch_lookups(),
    )
    serializer_class = auth.GroupSerializer
    permission_classes = [DjangoModelPermissions]
    filterset_fields = {"id": ["in"], "user__id": ["exact"]}
    search_fields = [
        "name",
    ]


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().prefetch_related(
        *_prefetch_lookups("user_"),
        *_prefetch_lookups("groups__"),
    )
    serializer_class = auth.UserSerializer
    permission_classes = [DjangoModelPermissions]
    filterset_fields = {"id": ["in"], "groups__id": ["exact", "in"]}
    search_fields = ["username", "email", "last_name", "first_name"]
    ordering_fields = ["id", "username", "email", "last_name", "first_name"]

    @action(detail=True, methods=["POST"])
    def password(self, request, pk):
        if request.user.pk != pk and not request.user.has_perm("auth.change_user"):
            return Response({}, status=status.HTTP_403_FORBIDDEN)

        user = self.get_object()
        serializer = auth.PasswordSerializer(data=request.data)
        if serializer.is_valid():
            user.set_password(serializer.validated_data["password"])
            user.save()
            return Response({})
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
