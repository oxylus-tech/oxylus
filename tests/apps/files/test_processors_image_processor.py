class TestImageProcessor:
    def test__create_preview(self, image_processor, image_000, preview_000):
        image_processor.create_preview(image_000, preview_000)
        assert preview_000.exists()
