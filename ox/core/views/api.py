from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import viewsets


__all__ = ("ModelViewSet", "ListCommitMixin")


class ModelViewSet(viewsets.ModelViewSet):
    """Base model viewset use by Oxylus application.

    Lookup objects by uuid.
    """

    lookup_field = "uuid"


class ListCommitMixin:
    """Viewset mixin providing ``commit`` action, which allows to update many
    items at once (create, update, delete)."""

    @action(name="commit", detail=False, methods=["POST"])
    def commit(self, request):
        """
        Request:

        .. code-block:: python

            {
                "delete": [pk],
                "update": [{pk, **object}],
                "create": [object_data]
            }

        Response:

        .. code-block:: python

            {
                "deleted": [pk],
                "updated": [object],
                "created": [object],
            }
        """
        queryset = self.get_queryset()
        resp = {"deleted": [], "updated": [], "created": []}
        if ids := request.data.get("delete"):
            q = queryset.filter(id__in=ids)
            resp["deleted"] = list(q.values_list("id", flat=True))
            q.delete()

        # TODO: bulk save and update
        if items := request.data.get("update"):
            resp["updated"] = self._commit_save_many(items)

        if items := request.data.get("create"):
            resp["created"] = self._commit_save_many(items)

        return Response(data=resp)

    def _commit_save_many(self, data):
        ser = self.get_serializer(data=data, many=True)
        ser.is_valid(raise_exception=True)

        items = ser.save()
        ser = self.get_serializer(items, many=True)
        return ser.data
