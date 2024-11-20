from django.contrib.auth.mixins import LoginRequiredMixin
from django.utils.translation import gettext_lazy as _


from ox.core.views import AppView


__all__ = ("ErrorView",)


class ErrorView(AppView):
    template_name = "ox/core/error.html"
    code = 400
    title = _("An error occurred")
    message = _("An error occurred while we proceeded the request.")

    def get(self, request, **kwargs):
        context = self.get_context_data(**kwargs)
        return self.render_to_response(context)

    def get_context_data(self, message=None, **kwargs):
        if not message:
            message = self.get_message(**kwargs)
        kwargs.setdefault("code", self.code)
        return super().get_context_data(message=message, **kwargs)

    def get_message(self, **_):
        return self.message


class PermissionForbiddenView(ErrorView):
    code = 403
    title = _("Permission forbidden")
    message = _("It seems that you have not the permission to access this content.")


class InternalErrorView(ErrorView):
    code = 500
    title = _("Internal server error")
    message = _("It seems that you have not the permission to access this content.")


class SettingsView(LoginRequiredMixin, AppView):
    template_name = "ox/core/settings.html"
