import shutil

import pytest

from django.conf import settings

from ox.apps.files import processors
from ox.apps.files.models import Folder, File
from ox.apps.files.conf import ox_files_settings


@pytest.fixture(scope="session", autouse=True)
def teardown():
    yield
    path = ox_files_settings.sync_dir
    path.exists() and shutil.rmtree(str(path))
    path = ox_files_settings.preview_dir
    path.exists() and shutil.rmtree(str(path))


@pytest.fixture
def image_000():
    return settings.MEDIA_ROOT / "image-000.jpg"


@pytest.fixture
def preview_000():
    path = settings.MEDIA_ROOT / "image-000.jpg.jpg"
    # we remove before running in order to keep visual confirmation
    path.unlink(missing_ok=True)
    return path


@pytest.fixture
def pdf_000():
    return settings.MEDIA_ROOT / "lorem.pdf"


@pytest.fixture
def pdf_preview():
    path = settings.MEDIA_ROOT / "lorem.pdf.jpg"
    path.unlink(missing_ok=True)
    return path


@pytest.fixture
def odt_000():
    return settings.MEDIA_ROOT / "lorem.odt"


@pytest.fixture
def odt_preview():
    path = settings.MEDIA_ROOT / "lorem.odt.jpg"
    path.unlink(missing_ok=True)
    return path


@pytest.fixture
def root_dir(agent):
    return Folder.objects.create(name="root", owner=agent)


@pytest.fixture
def subdir(root_dir):
    return Folder.objects.create(name="subdir", parent=root_dir, owner=root_dir.owner)


@pytest.fixture
def subdirs(root_dir, agent):
    return Folder.objects.bulk_create(
        [
            Folder(name="a", parent=root_dir, owner=agent),
            Folder(name="b", parent=root_dir, owner=agent),
            Folder(name="c", parent=root_dir, owner=agent),
        ]
    )


@pytest.fixture
def subsubdirs(subdirs, agent):
    folders = []
    for dir in subdirs:
        folders.extend([Folder(name=f"{dir.name}-{i}", parent=dir, owner=agent) for i in range(0, 2)])
    return Folder.objects.bulk_create(folders)


@pytest.fixture
def file(root_dir, image_000):
    path = image_000.parent / "test-file-000.jpg"
    try:
        shutil.copyfile(str(image_000), str(path))

        obj = File(name="test-file-000.jpg", owner=root_dir.owner, folder=root_dir)
        obj.file.name = str(path.relative_to(settings.MEDIA_ROOT))
        obj.save()
        yield obj
    finally:
        path.unlink(missing_ok=True)


@pytest.fixture
def processor():
    return processors.Processor()


@pytest.fixture
def image_processor():
    return processors.ImageProcessor()


@pytest.fixture
def pdf_processor():
    return processors.PDFProcessor()


@pytest.fixture
def libreoffice_processor():
    return processors.LibreOfficeProcessor()


@pytest.fixture
def registry(processor):
    return processors.Registry(processor)
