from django.urls import reverse

from ox.core.templatetags import ox


def test_panel_url():
    urlname = "ox_auth:index"
    url = reverse(urlname)

    assert ox.panel_url(urlname, "users") == f"{url}?panel=users"
    assert ox.panel_url(urlname, "users", "list.kanban") == f"{url}?panel=users&view=list.kanban"
    assert ox.panel_url(urlname, "users", id=123) == f"{url}?panel=users&view=detail.edit&id=123"


def test_do_json():
    assert ox.do_json({"a": 123}) == '{"a": 123}'
