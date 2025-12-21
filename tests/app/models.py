from django.db import models

from ox.core.models import Model
from ox.utils.models.tree import TreeNode as _TreeNode, OwnedTreeNode as _OwnedTreeNode
from ox.apps.content.models import TemplatePack as _TemplatePack


__all__ = ("Value", "TreeNode")


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


class OwnedTreeNode(_OwnedTreeNode):
    name = models.CharField(max_length=32, default="")


class TemplatePack(_TemplatePack):
    source_dir = "pack"
