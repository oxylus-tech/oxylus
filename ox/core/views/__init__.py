from .api import ModelViewSet
from .app import AppMixin, AppView, register_nav
from .generic import ListView, DetailView, UpdateView, DeleteView

__all__ = (
    "ModelViewSet",
    "AppMixin",
    "AppView",
    "register_nav",
    "ListView",
    "DetailView",
    "UpdateView",
    "DeleteView",
)
