from . import nav
from .api import ModelViewSet
from .app import AppView, UserAppView
from .generic import ListView, DetailView, UpdateView, DeleteView

__all__ = (
    "ModelViewSet",
    "AppView",
    "UserAppView",
    "register_nav",
    "ListView",
    "DetailView",
    "UpdateView",
    "DeleteView",
    "nav",
)
