import pytest

from ox.apps.files import views


@pytest.fixture
def file_viewset(req):
    return views.FileViewSet(request=req)


class TestFileViewSet:
    def test_perform_create(self):
        raise NotImplementedError()
