from django.views.generics import DetailView, ListView
from rest_framework import viewsets
from rest_framework.views import generics as rf_views

from ox.routes import route
from .models import Value


__all__ = ("ValueDetailView", "ValueListView", "ValueApiListView", "ValueViewSet")


@route()
class ValueDetailView(DetailView):
    model = Value


@route()
class ValueListView(ListView):
    model = Value


@route()
class ValueApiListView(rf_views.ListView):
    model = Value


@route()
class ValueViewSet(viewsets.ModelViewSet):
    model = Value
    queryset = Value.objects.all()
