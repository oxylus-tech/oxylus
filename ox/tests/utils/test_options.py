import pytest

from ox.utils.options import Options, WithOptions, WithOptionsMeta


@pytest.fixture
def Parent():
    class Parent(WithOptions):
        class Options(Options):
            a = 10
            b = 20

        class Meta(Options):
            c = 30
            d = 40

    return Parent


@pytest.fixture
def Child(Parent):
    class Child(Parent):
        class Options:
            b = 30

    return Child


class TestWithOptionsMeta:
    def test__init_options(self, Child, Parent):
        WithOptionsMeta.init_options(Child)
        assert Child.Options.a == 10
        assert Child.Options.b == 30
        assert Child.Meta == Parent.Meta

    def test_get_options(self, Child, Parent):
        opts, base_opts = WithOptionsMeta.get_options(Child)
        assert opts == WithOptionsMeta.get_options_for_class(Child)
        assert base_opts == {
            "Options": set(Parent.Options),
            "Meta": set(Parent.Meta),
        }

    def test__combine_base_options(self, Parent):
        opts = {}
        WithOptionsMeta._combine_base_options(Parent, opts)
        assert opts == {
            "Options": set(Parent.Options),
            "Meta": set(Parent.Meta),
        }

    def test_get_options_for_class(self, Parent):
        opts = set(WithOptionsMeta.get_options_for_class(Parent))
        assert opts == {
            ("Options", Parent.Options),
            ("Meta", Parent.Meta),
        }
