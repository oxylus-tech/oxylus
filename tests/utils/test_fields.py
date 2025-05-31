import pytest

from django.db import models

from ox.core.apps import AppConfig, AppMeta
from ox.utils.models.class_field import ClassField, ClassPath


class ModelTest(models.Model):
    handler = ClassField()

    class Meta:
        app_label = "ox_test"


@pytest.fixture
def class_path():
    return ClassPath(AppConfig)


@pytest.fixture
def class_field():
    return ClassField()


@pytest.fixture
def model(class_path):
    return ModelTest(handler=class_path)


class TestClassPath:
    def test___init___with_class(self):
        cpath = ClassPath(AppConfig)
        assert cpath.path == "ox.core.apps.AppConfig"

    def test___init___with_class_str(self):
        cpath = ClassPath("ox.core.apps.AppConfig")
        assert cpath.cls == AppConfig

    def test___str__(self, class_path):
        assert str(class_path) == class_path.path

    def test___repr__(self, class_path):
        assert repr(class_path) == f"<ClassPath: {class_path.path}>"

    def test_cls(self, class_path):
        assert class_path.cls == AppConfig

    def test___eq__(self, class_path):
        assert class_path == ClassPath("ox.core.apps.AppConfig")
        assert class_path == "ox.core.apps.AppConfig"
        assert class_path == AppConfig
        assert class_path != ClassPath("ox.utils.models.ClassField")
        assert class_path != "ox.core"
        assert class_path != ClassPath


class TestClassField:
    def test_from_db_value(self, class_field, class_path):
        assert class_field.from_db_value("ox.core.apps.AppConfig") == class_path

    def test_to_python(self, class_field, class_path):
        assert class_field.to_python("ox.core.apps.AppConfig") == class_path

    def test_get_prep_value(self, class_field, class_path):
        assert class_field.get_prep_value(class_path) == "ox.core.apps.AppConfig"
        assert class_field.get_prep_value(AppConfig) == "ox.core.apps.AppConfig"

    def test_field_usage(self, model, class_path):
        assert model.handler == AppConfig
        assert model.handler.path == "ox.core.apps.AppConfig"
        assert model.handler.cls == AppConfig

        model.handler = "ox.core.apps.AppMeta"
        assert model.handler == AppMeta
        assert model.handler.cls == AppMeta
        assert str(model.handler) == "ox.core.apps.AppMeta"
