from ox.apps.files.processors import Processor


class TestRegistry:
    def test_populate(self, registry):
        paths = [
            "ox.apps.files.processors.ImageProcessor",
            "ox.apps.files.processors.PDFProcessor",
        ]
        registry.populate(paths)
        assert len(registry.processors) == len(paths)
        assert all(isinstance(p, Processor) for p in registry.processors)

    def test_register(self, registry, image_processor, pdf_processor):
        registry.register(image_processor)
        registry.register(pdf_processor)

        assert [image_processor, pdf_processor] == registry.processors
        assert all(registry.mime_types[mt] is image_processor for mt in image_processor.mime_types)
        assert all(
            registry.mime_types[mt] is pdf_processor
            for mt in pdf_processor.mime_types
            if mt not in image_processor.mime_types
        )

    def test_read_mime_type_from_path(self, registry, image_000):
        assert registry.read_mime_type(image_000) == "image/jpeg"
        assert registry.read_mime_type(__file__) == "text/x-script.python"

    def test_read_mime_type_from_stream(self, registry, image_000):
        with open(image_000, "rb") as stream:
            assert registry.read_mime_type(stream) == "image/jpeg"

    def test_get(self, registry, image_processor, processor):
        registry.register(image_processor)
        assert registry.get("image/jpeg") is image_processor
        assert registry.get("any/other") is processor
