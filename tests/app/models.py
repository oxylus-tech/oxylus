from django.db import models

from ox.core.models import Model
from ox.utils.models import TreeNode as _TreeNode


class Value(Model):
    """Base model class to use in ox applications.

    It provides:
        - segregation between storage id and public uuid;
        - urls based on router declaration;
    """

    name = models.CharField(max_length=32, default="")
    value = models.IntegerField(default=0)


class TreeNode(_TreeNode):
    name = models.CharField(max_length=32, default="")
