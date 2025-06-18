from django.contrib.auth import authenticate, login
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.models import User
from django.shortcuts import redirect
from django.utils.translation import gettext_lazy as _

from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework.decorators import action

from ox.core.views import AppView
from ..serializers import auth, account


__all__ = ("AccountViewSet", "LoginView", "AccountView")


class LoginMixin:
    welcome_message = _("Welcome back dear {name}!")
    login_failed_message = _("Invalid credentials! May be you've mispelled it...")
    credentials_serializer_class = account.PasswordLoginSerializer

    def proceed_login(self, request, serializer) -> User | None:
        if serializer.is_valid():
            user = authenticate(request, **serializer.data)
            if user:
                login(request, user)
                return user

    def get_credentials_serializer(self, **kwargs):
        return self.credentials_serializer_class(**kwargs)

    def get_welcome_message(self, user, **kw):
        if user.first_name:
            kw["name"] = f"{user.first_name} {user.last_name or ''}".strip()
        else:
            kw["name"] = user.username
        return self.welcome_message.format(**kw)


class AccountViewSet(LoginMixin, viewsets.GenericViewSet):
    serializer_class = auth.UserSerializer
    credentials_serializer_class = account.PasswordLoginSerializer

    @action(detail=False, methods=["POST"])
    def login(self, request):
        serializer = self.get_credentials_serializer(data=request.data)
        user = self.proceed_login(request, serializer)
        if not user:
            return Response({"password": [self.login_failed_message]}, status=status.HTTP_403_FORBIDDEN)

        serializer = self.get_serializer(user)
        return Response({"messages": [self.get_welcome_message(user)], "user": serializer.data})


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
