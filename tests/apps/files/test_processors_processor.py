from ox.utils.tests import track_calls
from ox.apps.files.conf import ox_files_settings


class TestProcessor:
    def test_create_preview_with_path_exists_no_force(self, processor, image_000):
        calls = track_calls(processor, "_create_preview")
        assert not processor.create_preview(image_000, image_000)
        assert not calls

    def test__create_preview_with_path_exists_force(self, processor, image_000):
        calls = track_calls(processor, "_create_preview")
        processor.create_preview(image_000, image_000, force=True)
        assert calls == [((image_000, image_000, ox_files_settings.THUMBNAIL_SIZE), {})]

    def test__create_preview_calls__create_preview(self, processor, image_000, preview_000):
        calls = track_calls(processor, "_create_preview")
        processor.create_preview(image_000, preview_000)
        assert calls == [((image_000, preview_000, ox_files_settings.THUMBNAIL_SIZE), {})]

    def test_get_metadata(self, processor, image_000):
        assert processor.get_metadata(image_000) == {}
