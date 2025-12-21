import pytest

from ox.apps.content.conf import ox_content_settings
from ox.apps.content.models import RichTextField


@pytest.fixture
def richtext_field():
    return RichTextField("name")


class TestRichTextField:
    def test_to_python(self, richtext_field):
        assert richtext_field.to_python("content <script></script>!") == "content &lt;script&gt;&lt;/script&gt;!"


class TestTemplatePack:
    def test_template_dir(self, pack):
        assert pack.template_dir == pack.get_template_dir() / pack.slug

    def test_static_dir(self, pack):
        assert pack.static_dir == pack.get_static_dir() / pack.slug

    def test_get_template_dir(self, pack):
        assert pack.get_template_dir() == ox_content_settings.template_dir / pack.get_source_dirname()

    def test_get_static_dir(self, pack):
        assert pack.get_static_dir() == ox_content_settings.static_dir / pack.get_source_dirname()

    def test_get_source_dirname(self, pack):
        assert pack.get_source_dirname() == pack.source_dir
        try:
            type(pack).source_dir, source_dir = None, pack.source_dir
            assert pack.get_source_dirname() == type(pack)._meta.label_lower
        finally:
            type(pack).source_dir = source_dir
