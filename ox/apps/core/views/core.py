from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.models import User
from django.shortcuts import redirect
from django.views.generic import RedirectView
from django.utils.translation import gettext_lazy as _


from ox.core.views import AppView
from .. import serializers


__all__ = (
    "ErrorView",
    "PermissionForbiddenView",
    "InternalErrorView",
    "SettingsView",
    "LoginMixin",
    "LoginView",
    "LogoutView",
    "AccountView",
    "DashboardView",
)


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


class LoginMixin:
    welcome_message = _("Welcome back dear {name}!")
    login_failed_message = _("Invalid credentials! May be you've mispelled it...")
    credentials_serializer_class = serializers.PasswordLoginSerializer

    def proceed_login(self, request, serializer) -> User | None:
        if serializer.is_valid():
            user = authenticate(request, **serializer.data)
            if user:
                login(request, user)
                return user

    def get_credentials_serializer(self, **kwargs):
        return self.credentials_serializer_class(**kwargs)

    def get_welcome_message(self, user, **kw):
        kw["name"] = user.get_full_name() or user.username
        return self.welcome_message.format(**kw)


class LoginView(LoginMixin, AppView):
    template_name = "ox/core/login.html"
    icon = "mdi-login"
    app_config_name = "ox_core"
    queryset = User.objects.filter(is_active=True)

    def get(self, request, **kwargs):
        context = self.get_context_data(**kwargs)
        return self.render_to_response(context)

    def post(self, request, **kwargs):
        context = self.get_context_data(**kwargs)
        serializer = self.get_credentials_serializer(data=request.POST)
        user = self.proceed_login(request, serializer)

        context["serializer"] = serializer
        if not serializer.valid:
            context["errors"] = serializer.errors
        elif user:
            return self.success(request, user=user, **context)
        else:
            context["errors"] = {"": [self.login_failed_message]}
        return self.render_to_response(context)

    def success(self, request, user, **context):
        if next := request.GET.get("next"):
            if next.startsWith("/"):
                return redirect(next)
        context["messages"] = self.get_welcome_message(user)
        return self.render_to_response(request, context)


class LogoutView(RedirectView):
    pattern_name = "login"

    def dispatch(self, request, *args, **kwargs):
        logout(request)
        print("logout!")
        return super().dispatch(request, *args, **kwargs)


class AccountView(AppView):
    template_name = "ox/core/account.html"
    app_config_name = "ox_core"
    title = _("My Account")

    def get(self, request, **kwargs):
        context = self.get_context_data(**kwargs)
        return self.render_to_response(context)


class DashboardView(LoginRequiredMixin, AppView):
    template_name = "ox/core/dashboard.html"
    app_config_name = "ox_core"
    title = _("Dashboard")
