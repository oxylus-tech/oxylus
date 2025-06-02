from __future__ import annotations
from django.core.exceptions import ValidationError
from django.db import models
from django.db.models import Max, Value
from django.db.models.functions import Concat, Substr
from django.utils.translation import gettext_lazy as _

from .save_hook import SaveHook, SaveHookQuerySet


class TreeNodeQuerySet(SaveHookQuerySet):
    def root_nodes(self) -> TreeNodeQuerySet:
        """Return root nodes."""
        return self.filter(level=0)

    def descendants(self, node, inclusive: bool = False) -> TreeNodeQuerySet:
        """Return all descendants of a node.

        :param node: the node to check on
        :param inclusive: if True, includes the node too
        """
        level = node.level if inclusive else node.level + 1
        return self.filter(tree_id=node.tree_id, level__gte=level, path__startswith=node.path)


class TreeNode(SaveHook):
    """Represent a tree node, using mechanism similar to MPTT.

    The tree uses path in order to lookup for children. The path is
    constructed based on field provided by :py:attr:`path_part_attr`.
    By default it is set to ``name`` (not provided by this model).
    """

    tree_id = models.PositiveIntegerField(_("Tree id"), blank=True)
    level = models.PositiveIntegerField(_("Tree level"), default=0, blank=True)
    parent = models.ForeignKey("self", models.CASCADE, null=True, blank=True, related_name="children")
    path = models.CharField(_("Path"), max_length=512, db_index=True)

    path_part_attr = "name"
    """ Attribute to get path from (as part of it) """
    path_sep = "/"
    """ Path separator """
    path_unique = True
    """ If True, ensure path is unique for each parent. """

    class Meta:
        abstract = True

    def on_save(self, fields=None):
        """Ensure tree id, level and path are set.

        It also :py:meth:`validate_node` and update children's values.
        """
        if self.parent:
            self.tree_id = self.parent.tree_id
            self.level = self.parent.level + 1
        elif self.tree_id is None:
            tree_id = type(self).objects.aggregate(Max("tree_id"))["tree_id__max"] or 0
            self.tree_id = tree_id + 1
            self.level = 0

        self.validate_node()

        path = self.get_path()
        if path != self.path:
            old_len = len(self.path)
            self.get_descendants().update(path=Concat(Value(self.path + "/"), Substr("path", old_len + 2)))
            self.path = path

    def validate_node(self):
        """Validate the node.

        :yield ValidationError: if a path exists for parent and should be unique.
        """
        cls = type(self)
        if cls.path_unique:
            path = self.get_path()  # ensure to have actual path
            query = cls.objects.filter(parent_id=self.parent_id, path=path)
            if self.pk:
                query = query.exclude(pk=self.pk)
            if query.exists():
                raise ValidationError(f"Another {cls._meta.verbose_name} exists for this path.")

    def get_path(self) -> str:
        """Return path for self and the provided parent."""
        attr = getattr(self, self.path_part_attr)
        prefix = self.parent and self.parent.path or ""
        return f"{prefix}{self.path_sep}{attr}"

    def move_to(self, parent: TreeNode | None, save: bool = True):
        """
        Insert node into the provided parent.

        :param parent: parent node (or ``None`` for root node)
        :param save: save instance if True
        """
        self.parent = parent
        if parent is None:
            self.tree_id = None
        if save:
            self.save()
        else:
            self.on_save()

    def insert(self, child: TreeNode, save: bool = True):
        """
        Insert child into self.

        :param child: child node to insert
        :param save: save instance if True
        """
        child.move_to(self, save)

    def siblings(self, inclusive: bool = False) -> TreeNodeQuerySet:
        """Return queryset to node siblings.

        :param inclusive: whether to include self.
        """
        query = type(self).objects.filter(parent_id=self.parent_id)
        if not inclusive and self.pk:
            query = query.exclude(pk=self.pk)
        return query

    def get_descendants(self, inclusive: bool = False) -> TreeNodeQuerySet:
        """Return a queryset to all descendants (shortcut to :py:meth:`TreeNodeQuerySet.descendants`).

        :param inclusive: whether to include self.
        """
        return type(self).objects.descendants(self, inclusive)
