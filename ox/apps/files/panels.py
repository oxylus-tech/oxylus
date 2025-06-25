from django.utils.translation import gettext_lazy as _

from ox.core.panels import registry, Panel, Panels


panels = Panels(
    "files",
    _("Files"),
    items=[
        Panel(
            "files",
            _("Files"),
            "mdi-file-outline",
            "ox-file-panel",
            url="ox_files:index",
            permission="ox_files.view_file",
        ),
        Panel(
            "folders",
            _("Folders"),
            "mdi-folder-outline",
            "ox-folder-panel",
            url="ox_files:index",
            permission="ox_files.view_folder",
        ),
    ],
)

registry.append(panels)
