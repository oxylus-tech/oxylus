from django import template, urls


register = template.Library()


@register.simple_tag
def panel_url(urlname, panel, view=None, id=None):
    url = urls.reverse(urlname)
    query = f"panel={panel}"
    if id:
        view = view or "detail.edit"
        query += f"&view={view}&id={id}"
    elif view:
        query += f"&view={view}"
    return f"{url}?{query}"
