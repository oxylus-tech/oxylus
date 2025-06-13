from ox.apps.files.filters import FolderFilterSet
from ox.apps.files.models import Folder


class TestFolderFilterSet:
    def test_ancestors_filter(self, subsubdirs):
        obj = subsubdirs[0]
        query = FolderFilterSet().ancestors_filter(Folder.objects.all(), "", obj.uuid)
        assert list(query) == list(obj.get_ancestors())

    def test_descendants_filter(self, root_dir, subsubdirs):
        obj = subsubdirs[0]
        query = FolderFilterSet().descendants_filter(Folder.objects.all(), "", obj.uuid)
        assert list(query) == list(obj.get_descendants())
