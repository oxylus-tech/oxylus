from django_filters import FilterSet

from . import models


class PersonFilterSet(FilterSet):
    class Meta:
        model = models.Person
