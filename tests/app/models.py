from django.db import models

from ox.core.models import Model


class Value(Model):
    """Base model class to use in ox applications.

    It provides:
        - segregation between storage id and public uuid;
        - urls based on router declaration;
    """

    name = models.CharField(max_length=32, default="")
    value = models.IntegerField(default=0)
