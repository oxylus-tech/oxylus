from ox.apps.files import tasks


def test_create_preview(file):
    res = tasks.create_preview.func(file.uuid)
    assert res[0]
    file.refresh_from_db()
    assert file.mime_type, file.preview.path
