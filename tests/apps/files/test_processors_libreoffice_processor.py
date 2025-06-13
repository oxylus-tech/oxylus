class TestLibreOfficeProcessor:
    def test__create_preview(self, libreoffice_processor, odt_000, odt_preview):
        libreoffice_processor.create_preview(odt_000, odt_preview)
        assert odt_preview.exists()
