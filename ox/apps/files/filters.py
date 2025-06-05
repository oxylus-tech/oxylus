import django_filters as filters

from . import models


__all__ = ("FolderFilterSet",)


class FolderFilterSet(filters.FilterSet):
    root = filters.BooleanFilter(field_name="parent", lookup_expr="isnull")

    class Meta:
        model = models.Folder
        fields = {
            "path": ["exact", "icontains"],
            "owner__uuid": ["exact"],
            "parent__uuid": ["exact", "isnull"],
            "name": ["exact", "icontains"],
            "level": ["exact"],
        }
