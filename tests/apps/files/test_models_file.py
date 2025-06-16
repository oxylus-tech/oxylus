from pathlib import Path

import pytest
from django.core.exceptions import PermissionDenied, ValidationError

from ox.utils.tests import track_calls
from ox.apps.files.conf import ox_files_settings
from ox.apps.files.models.file import File, file_upload_to, get_obfuscated_path


class TestFileQuerySet:
    def test_delete_clear_files(self, file):
        path = Path(file.file.path)
        assert path.exists()
        File.objects.filter(id=file.id).delete(clear_files=True)
        assert not path.exists()


def test_file_upload_to_default(file):
    path = file_upload_to(file, "filename.jpg")
    assert "filename.jpg" not in path
    assert path.startswith(ox_files_settings.UPLOAD_DIR)


def test_file_upload_to_sync(file):
    file.folder.is_sync = True
    path = file_upload_to(file, "filename.jpg")
    expected = f"{ox_files_settings.SYNC_DIR}/{file.folder.owner.uuid}{file.folder.path}/filename.jpg"
    assert path == expected


def test_get_obfuscated_path():
    path = get_obfuscated_path(".odt")
    assert path.endswith(".odt")

    parts = path.split("/")
    assert len(parts[0]) == len(parts[1]) == 2
    assert parts[2].startswith("".join(parts[:2]))


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
