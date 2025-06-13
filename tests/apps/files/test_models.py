from pathlib import Path

import pytest
from django.core.exceptions import PermissionDenied, ValidationError

from ox.utils.tests import track_calls
from ox.apps.files.models import File


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
    def test_delete_clear_files(self, file):
        path = Path(file.file.path)
        assert path.exists()
        File.objects.filter(id=file.id).delete(clear_files=True)
        assert not path.exists()


class TestFile:
    def test_on_save_calls_validate_node(self, file):
        calls = track_calls(file, "validate_node")
        file.on_save()
        assert calls

    def test_validate_node_wrong_owner(self, file, agent_2):
        file.owner = agent_2
        with pytest.raises(PermissionDenied):
            file.validate_node()

    def test_validate_node_file_name_collision(self, file):
        new_file = File(name=file.name, folder=file.folder, owner=file.owner)
        new_file.pk = None
        with pytest.raises(ValidationError):
            new_file.validate_node()

    def test_validate_node_folder_name_collision(self, file, subdir):
        file.name = subdir.name
        with pytest.raises(ValidationError):
            file.validate_node()

    def test_read_mime_type(self, file):
        assert file.read_mime_type() == "image/jpeg"
        assert file.mime_type == "image/jpeg"

    def test_get_processor_and_read_mime_type(self, file):
        processor = file.get_processor()
        assert file.mime_type == "image/jpeg"
        assert file.mime_type in processor.mime_types

    def test_clear_files(self, file):
        path = Path(file.file.path)
        assert path.exists()
        file.clear_files()
        assert not path.exists()

    def test_delete_calls_clear_files(self, file):
        calls = track_calls(file, "clear_files")
        file.delete(clear_files=True)
        assert calls
