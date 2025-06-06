import pytest
from django.core.exceptions import ValidationError

from ..app.models import TreeNode


@pytest.fixture
def root_node(db):
    return TreeNode.objects.create(name="root")


@pytest.fixture
def second_root(db):
    return TreeNode.objects.create(name="second root")


@pytest.fixture
def child(root_node):
    return TreeNode.objects.create(name="child", parent=root_node)


@pytest.fixture
def child_2(root_node):
    return TreeNode.objects.create(name="child 2", parent=root_node)


@pytest.fixture
def subchild(child):
    return TreeNode.objects.create(name="subchild", parent=child)


class TestTreeNodeQuerySet:
    def test_ancestors_with_root_not_inclusive(self, root_node):
        assert not TreeNode.objects.ancestors(root_node, False)

    def test_ancestors_with_root_inclusive(self, root_node):
        assert list(TreeNode.objects.ancestors(root_node, True)) == [root_node]

    def test_ancestors_not_inclusive(self, subchild, child, root_node, child_2, second_root):
        assert list(TreeNode.objects.ancestors(subchild, False)) == [root_node, child]

    def test_ancestors_inclusive(self, subchild, child, root_node, child_2, second_root):
        assert list(TreeNode.objects.ancestors(subchild, True)) == [root_node, child, subchild]


class TestTreeNode:
    def test_on_save_with_parent(self, root_node, child):
        assert child.parent == root_node
        assert child.tree_id == root_node.tree_id
        assert child.level == 1
        assert child.path == f"{root_node.path}/{child.name}"

    def test_on_save_without_parent(self, root_node, second_root):
        assert root_node.tree_id == 1
        assert root_node.level == 0
        assert root_node.path == "/root"

        assert second_root.tree_id == 2
        assert second_root.level == 0
        assert second_root.path == "/second root"

    def test_on_save_update_paths(self, root_node, child, child_2, subchild):
        root_node.name = "new"
        root_node.on_save()

        query = root_node.get_descendants().values_list("path", flat=True)
        assert all(n.startswith("/new/") for n in query)

    def test_validate_node(self, root_node, child):
        node = TreeNode(name=child.name, parent=root_node)
        with pytest.raises(ValidationError):
            node.validate_node()

    def test_move_to(self, second_root, child):
        child.move_to(second_root)
        assert child.tree_id == second_root.tree_id
        assert child.parent == second_root

    def test_move_to_root(self, root_node, second_root, child):
        child.move_to(None)
        assert child.tree_id == second_root.tree_id + 1
        assert child.parent is None
        assert child.level == 0

    def test_insert(self, second_root, child):
        second_root.insert(child)
        assert child.tree_id == second_root.tree_id
        assert child.parent == second_root

    def test_siblings(self, root_node, child, child_2):
        assert list(child.siblings()) == [child_2]

    def test_siblings_including_self(self, root_node, child, child_2):
        assert list(child.siblings(True)) == [child, child_2]

    def test_get_descendants(self, root_node, child, child_2, subchild):
        assert list(root_node.get_descendants()) == [child, child_2, subchild]
        assert list(root_node.get_descendants(True)) == [root_node, child, child_2, subchild]
        assert list(child.get_descendants()) == [subchild]
        assert list(child_2.get_descendants()) == []
