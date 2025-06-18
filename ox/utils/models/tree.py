from __future__ import annotations
from django.core.exceptions import ValidationError
from django.db import models
from django.db.models import Max, Value, Q
from django.db.models.functions import Concat, Substr
from django.utils.translation import gettext_lazy as _

from ox.utils.models.save_hook import SaveHook, SaveHookQuerySet


class TreeNodeQuerySet(SaveHookQuerySet):
    def root_nodes(self) -> TreeNodeQuerySet:
        """Return root nodes."""
        return self.filter(level=0)

    def find_clone(self, node, **lookups) -> TreeNodeQuerySet:
        """
        Search for a node that would be the same as this one.
        This is used in order to search for colliding paths.

        :param node: node to look.
        :param **lookup: extra filters to add.
        """
        lookups.update(
            {
                "parent_id": node.parent,
                "path": node.get_path(),
            }
        )
        self = self.filter(**lookups)
        if node.pk:
            return self.exclude(pk=node.pk)
        return self

    def descendants(self, node, inclusive: bool = False) -> TreeNodeQuerySet:
        """Return all descendants of a node, order by default by level and path.

        :param node: the node to check on
        :param inclusive: if True, includes the node too
        """
        level = node.level if inclusive else node.level + 1
        return self.filter(tree_id=node.tree_id, level__gte=level, path__startswith=node.path).order_by(
            "level", self.model.path_part_attr
        )

    def ancestors(self, node, inclusive: bool = False) -> TreeNodeQuerySet:
        """Return all ancestors of a node, order by default by level.

        :param node: the node to check on
        :param inclusive: if True, includes the node too
        """
        sep = self.model.path_sep
        if node.level > 0:
            parts = node.path.split(sep)[1:]
            q = Q()
            for i in range(0, len(parts) - 1):
                q |= Q(tree_id=node.tree_id, level=i, path=sep + sep.join(parts[: i + 1]))

            if inclusive:
                q |= Q(pk=node.pk)
            return self.filter(q).order_by("level")
        # root node
        return self.filter(pk=node.pk) if inclusive else self.none()


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

    objects = TreeNodeQuerySet.as_manager()

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

        super().on_save(fields)
        self.validate_node()

        path = self.get_path()
        if path != self.path:
            old_len = len(self.path)
            self.get_descendants().update(path=Concat(Value(self.path + "/"), Substr("path", old_len + 2)))
            self.path = path

    def validate_node(self, queryset=None):
        """Validate the node.

        :yield ValidationError: if a path exists for parent and should be unique.
        """
        cls = type(self)
        if cls.path_unique:
            path = self.get_path()  # ensure to have actual path
            query = cls.objects.find_clone(self)
            if query.exists():
                raise ValidationError(
                    {self.path_part_attr: f"Another {cls._meta.verbose_name} exists for this path `{path}`."}
                )

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

    def get_ancestors(self, inclusive: bool = False) -> TreeNodeQuerySet:
        """Return a queryset to all ancestors (shortcut to :py:meth:`TreeNodeQuerySet.ancestors`).

        :param inclusive: whether to include self.
        """
        return type(self).objects.ancestors(self, inclusive)
