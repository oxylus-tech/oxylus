import pytest
from django.core.exceptions import PermissionDenied, ValidationError

from ox.apps.files.models import File
from ox.apps.files.conf import ox_files_settings


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

    def test_sync_raises_value_error(self, root_dir):
        with pytest.raises(ValueError):
            root_dir.sync()

    def test_sync_creates_directory(self, root_dir):
        root_dir.is_sync = True
        path = None
        try:
            path = root_dir.sync()
            assert path.exists() and path.is_dir()
        finally:
            path and path.rmdir()

    def test_sync_move_directory(self, root_dir):
        root_dir.is_sync = True
        path, path_2 = None, None
        try:
            path = root_dir.sync()
            assert path.exists() and path.is_dir()

            initial = root_dir.path
            root_dir.path = "/root_dir-2-2"
            path_2 = root_dir.sync(initial)
            assert not path.exists()
            assert path_2.exists() and path_2.is_dir()
        finally:
            path and path.exists() and path.rmdir()
            path_2 and path_2.rmdir()

    def test_get_sync_path(self, root_dir):
        path = str(root_dir.get_sync_path(root_dir.path))
        assert path.startswith(str(ox_files_settings.sync_dir))
        assert str(root_dir.owner.uuid) in path
        assert root_dir.path in path
