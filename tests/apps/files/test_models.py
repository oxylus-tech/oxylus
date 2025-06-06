import pytest
from django.core.exceptions import PermissionDenied, ValidationError

from ox.apps.files.models import Folder, File


@pytest.fixture
def root_dir(agent):
    return Folder.objects.create(name="root", owner=agent)


@pytest.fixture
def subdir(root_dir):
    return Folder.objects.create(name="subdir", parent=root_dir, owner=root_dir.owner)


@pytest.fixture
def subdirs(root_dir, agent):
    return Folder.objects.bulk_create(
        [
            Folder(name="a", parent=root_dir, owner=agent),
            Folder(name="b", parent=root_dir, owner=agent),
            Folder(name="c", parent=root_dir, owner=agent),
        ]
    )


@pytest.fixture
def subsubdirs(subdirs, agent):
    folders = []
    for dir in subdirs:
        folders.extend([Folder(name=f"{dir.name}-{i}", parent=dir, owner=agent) for i in range(0, 2)])
    return Folder.objects.bulk_create(folders)


class TestFolderQuerySet:
    def test_create(self, root_dir, subdirs):
        assert root_dir.path == "/root"
        for dir in subdirs:
            assert dir.path == f"/root/{dir.name}"


class TestFolder:
    def test_validate_node_wrong_owner(self, root_dir, agent_2, subdir):
        with pytest.raises(PermissionDenied):
            subdir.owner = agent_2
            subdir.validate_node()

    def test_validate_node_folder_name_collision(self, root_dir, agent, subdirs, subdir):
        with pytest.raises(ValidationError):
            subdir.name = subdirs[0].name
            subdir.validate_node()

    def test_validate_node_file_name_collision(self, root_dir, agent, subdir):
        file = File.objects.create(folder=root_dir, name="file-1", file="file.py", owner=agent, file_size=0)
        with pytest.raises(ValidationError):
            subdir.name = file.name
            subdir.validate_node()

    def test_rename(self, root_dir):
        root_dir.rename("new")

        assert root_dir.name == "new"
        assert root_dir.path == "/new"
        assert all(v.startswith("/new/") for v in root_dir.get_descendants().values_list("path", flat=True))

    def test_move_to(self, subdirs, subsubdirs):
        subdir, parent = subdirs[0], subdirs[1]
        subdir.move_to(parent, "new")

        assert subdir.name == "new"
        assert subdir.parent == parent
        path = f"{parent.path}/new/"
        assert all(v.startswith(path) for v in subdir.get_descendants().values_list("path", flat=True))


class TestFileQuerySet:
    pass


class TestFile:
    def test_get_processor(self):
        pass

    def test_delete_files(self):
        pass
