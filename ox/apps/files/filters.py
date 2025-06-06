import django_filters as filters

from . import models


__all__ = ("FolderFilterSet",)


class FolderFilterSet(filters.FilterSet):
    root = filters.BooleanFilter(field_name="parent", lookup_expr="isnull")
    ancestors = filters.UUIDFilter(method="ancestors_filter")
    descendants = filters.UUIDFilter(method="descendants_filter")

    class Meta:
        model = models.Folder
        fields = {
            "path": ["exact", "icontains"],
            "owner__uuid": ["exact"],
            "parent__uuid": ["exact", "isnull"],
            "name": ["exact", "icontains"],
            "level": ["exact"],
        }

    def ancestors_filter(self, queryset, name, value):
        """Filter to ancestors of provided object uuid."""
        node = queryset.get(uuid=value)
        return node.get_ancestors()

    def descendants_filter(self, queryset, name, value):
        """Filter to descendants of provided object uuid."""
        node = queryset.get(uuid=value)
        return node.get_descendants()
