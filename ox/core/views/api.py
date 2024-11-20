from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import viewsets


__all__ = ("ModelViewSet", "AutocompleteMixin", "ListCommitMixin")


class ModelViewSet(viewsets.ModelViewSet):
    """Base model viewset use by Oxylus application.

    Lookup objects by uuid.
    """

    lookup_field = "uuid"
    lookup_value_regex = "[0-9a-f]{32}"


class AutocompleteMixin:
    """Viewset mixin providing ``autocomplete`` action, using provided
    filterset and serializer.

    Url ``GET`` parameters:
        - `field` (many): if provided, only return provided field names
        - filterset's lookups.

    Return a list of values if ``field`` is provided, result of `list()` otherwise.
    """

    autocomplete_result_count = 10
    """Returned result count."""

    @action(name="autocomplete", detail=False)
    def autocomplete(self, request):
        field = request.GET.get("field", None)
        if field:
            queryset = self.filter_queryset(self.get_queryset())
            values = queryset.values_list(field, flat=True).distinct()
            values = values[: self.autocomplete_result_count]
            return Response(values)
        return self.list(request)


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
