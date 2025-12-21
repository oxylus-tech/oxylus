from copy import deepcopy
import pytest
from bs4 import BeautifulSoup

from ox.apps.content import blocks


@pytest.fixture
def dyn_block():
    return blocks.DynamicBlock("test", inline=True, repl="--{content}--")


@pytest.fixture
def var_block():
    return blocks.VariableBlock()


@pytest.fixture
def ifvar_block():
    return blocks.IfVariableBlock()


class TestDynamicBlock:
    soup = BeautifulSoup(
        """<p><span data-block="test">content-0</span></p><p><span data-block="test">content-1</span></p>"""
    )

    def test_run(self, renderer, dyn_block):
        soup = deepcopy(self.soup)
        dyn_block.run(renderer, soup)
        assert str(soup) == "<p>--content-0--</p><p>--content-1--</p>"


class TestVariableBlock:
    soup = BeautifulSoup("""<p><span data-block="variable" data-block-variable="name">some content</span></p>""")

    def test_run(self, renderer, var_block):
        soup = deepcopy(self.soup)
        var_block.run(renderer, soup)
        assert str(soup) == "<p>{{ name }}</p>"

    def test_validate(self, renderer, var_block):
        el = self.soup.find("span")
        assert var_block.validate(renderer, el) == {"content": "some content", "variable": "name"}

    def test_validate_fails_with_unknown_var(self, renderer, var_block):
        soup = deepcopy(self.soup)
        el = soup.find("span")
        el["data-block-variable"] = "fake_variable"
        assert var_block.validate(renderer, el) is None


class TestIfVariableBlock:
    soup = BeautifulSoup("""<p><div data-block="ifvariable" data-block-variable="name">some content</div></p>""")

    def test_run(self, renderer, ifvar_block):
        soup = deepcopy(self.soup)
        ifvar_block.run(renderer, soup)
        assert str(soup) == "<p>{% if name %}some content{% endif %}</p>"
