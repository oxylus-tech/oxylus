from pathlib import Path
import pytest

from tests.app.models import TemplatePack
from ox.apps.content.renderers import Renderer, VariableInfo


@pytest.fixture
def pack(transactional_db):
    return TemplatePack.objects.create(name="name", slug="slug")


@pytest.fixture
def pack_2(transactional_db):
    return TemplatePack.objects.create(name="name-2", slug="slug-2")


@pytest.fixture
def renderer():
    return Renderer(
        template_dirs=[Path(__file__).parent / "templates"],
        variables={
            "name": VariableInfo("Name", "Sample Name"),
            "email": VariableInfo("Email", "Sample Email"),
        },
    )
