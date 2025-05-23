import json
from django import template, urls

register = template.Library()


@register.simple_tag
def panel_url(urlname: str, panel: str, view: str | None = None, id: str | int | None = None) -> str:
    """Return url to this panel.

    :param urlname: url name
    :param panel: panel name
    :param view: target view
    :param id: target object id
    """
    url = urls.reverse(urlname)
    query = f"panel={panel}"
    if id:
        view = view or "detail.edit"
        query += f"&view={view}&id={id}"
    elif view:
        query += f"&view={view}"
    return f"{url}?{query}"


@register.filter("json")
def do_json(value) -> str:
    """Dumps value as json string."""
    return json.dumps(value)
