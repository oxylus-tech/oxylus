class TestPDFProcessor:
    def test__create_preview(self, pdf_processor, pdf_000, pdf_preview):
        pdf_processor.create_preview(pdf_000, pdf_preview)
        assert pdf_preview.exists()
