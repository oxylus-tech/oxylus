from django.views import generic


__all__ = ("ObjectByUUIDMixin", "ListView", "DetailView", "UpdateView", "DeleteView")


class ObjectByUUIDMixin:
    uuid_field = "uuid"
    uuid_url_kwargs = "uuid"

    def get_object(self, queryset=None):
        if queryset is None:
            queryset = self.get_queryset()

        if self.model._meta.get_fields(self.uuid_field):
            uuid = self.kwargs.get(self.uuid_url_kwargs)
            if uuid:
                return queryset.get(uuid=uuid)
        return super().get_object(queryset)


class ListView(generic.ListView):
    pass


class DetailView(ObjectByUUIDMixin, generic.DetailView):
    pass


class CreateView(generic.CreateView):
    pass


class UpdateView(ObjectByUUIDMixin, generic.edit.UpdateView):
    pass


class DeleteView(ObjectByUUIDMixin, generic.edit.DeleteView):
    pass
