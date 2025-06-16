import pytest

from django.apps import apps
from django.contrib.auth.models import Group

from ox.core import signals


@pytest.mark.django_db(transaction=True)
def test_create_app_groups():
    # groups are already created
    app = apps.get_app_config("ox_test")
    signals.create_app_groups(app, app)

    staff = Group.objects.get(name=f"{app.verbose_name}: Staff")
    viewers = Group.objects.get(name=f"{app.verbose_name}: View")

    s_perms = staff.permissions.all().values_list("codename", flat=True)
    v_perms = viewers.permissions.all().values_list("codename", flat=True)

    for model in app.get_models():
        codenames = (f"{action}_{model._meta.model_name}" for action in ("view", "add", "change", "delete"))
        assert all(codename in s_perms for codename in codenames)
        assert f"view_{model._meta.model_name}" in v_perms
