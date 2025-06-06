import pytest

from ox.apps.files import processors
from ox.utils.tests import track_calls


@pytest.fixture
def file_processor():
    return processors.FileProcessor()


@pytest.fixture
def image_processor():
    return processors.ImageProcessor()


@pytest.fixture
def file_processors(file_processor, image_processor):
    return processors.FileProcessors(file_processor, [image_processor])


class TestFileProcessor:
    def test_create_preview_with_path_exists_no_force(self, file_processor, image_000):
        calls = track_calls(file_processor, "_create_preview")
        assert not file_processor.create_preview(image_000, image_000)
        assert not calls

    def test__create_preview_with_path_exists_force(self, file_processor, image_000):
        calls = track_calls(file_processor, "_create_preview")
        file_processor.create_preview(image_000, image_000, force=True)
        assert calls == [((image_000, image_000), {})]

    def test__create_preview_calls__create_preview(self, file_processor, image_000, preview_000):
        calls = track_calls(file_processor, "_create_preview")
        file_processor.create_preview(image_000, preview_000)
        assert calls == [((image_000, preview_000), {})]

    def test_get_metadata(self, file_processor, image_000):
        assert file_processor.get_metadata(image_000) == {}


class TestImageProcessor:
    def test__create_preview(self, image_processor, image_000, preview_000):
        image_processor.create_preview(image_000, preview_000)
        assert preview_000.exists()


class TestFileProcessors:
    def test___init___and_register(self, file_processors, file_processor, image_processor):
        assert file_processors.default_processor is file_processor
        assert image_processor in file_processors.processors
        assert all(mt in file_processors.mime_types for mt in image_processor.mime_types)

    def test_register_raises_type_error(self, file_processors):
        with pytest.raises(TypeError):
            file_processors.register("invalid value")

    def test_read_mime_type_from_path(self, file_processors, image_000):
        assert file_processors.read_mime_type(image_000) == "image/jpeg"
        assert file_processors.read_mime_type(__file__) == "text/x-script.python"

    def test_read_mime_type_from_stream(self, file_processors, image_000):
        with open(image_000, "rb") as stream:
            assert file_processors.read_mime_type(stream) == "image/jpeg"

    def test_get(self, file_processors, image_processor, file_processor):
        assert file_processors.get("image/jpeg") is image_processor
        assert file_processors.get("any/other") is file_processor
