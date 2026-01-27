import json
from django import template, urls


register = template.Library()


@register.simple_tag
def panel_url(
    urlname: str,
    panel: str,
    view: str | None = None,
    section_or_id: str | int | None = None,
    id: str | int | None = None,
) -> str:
    """Return url to this panel.

    :param urlname: url name
    :param panel: panel name
    :param view: target view
    :param section_or_id: section name (when id is provided) or id
    :param id: target object id
    """
    url = urls.reverse(urlname)
    section, id = id and section_or_id, id or section_or_id

    query = f"p={panel}"
    if id:
        view = view or "edit"
        query += f"&v={view}&id={id}"
    elif view:
        query += f"&v={view}"

    if section:
        query += f"&s={section}"

    return f"{url}?{query}"


@register.filter("json")
def do_json(value) -> str:
    """Dumps value as json string."""
    return json.dumps(value)


@register.simple_tag
def format_string(template_str, *args, **kwargs):
    try:
        return template_str.format(*args, **kwargs)
    except Exception as e:
        return f"[format error: {e}]"


@register.filter("startswith")
def do_startswith(text, search) -> bool:
    """Return True when provided text start with `search`."""
    return text.startswith(search)
