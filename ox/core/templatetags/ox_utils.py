import json
from django import template

from ox.utils.serializers import SerializeMixin

register = template.Library()


@register.filter("json")
def do_json(value):
    if isinstance(value, SerializeMixin):
        value = value.serialize()
    return json.dumps(value)
