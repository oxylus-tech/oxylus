from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action

from . import renderers, serializers


__all__ = ("WithRendererViewSet",)


class WithRendererViewSet(viewsets.ViewSet):
    """
    This mixin is used to add an action allowing rich text editor to discover
    what are the actual renderer capability.

    The ``OxRichEditor`` will make an API call (if endpoint is provided) to
    get the information, such as the allowed dynamic blocks or variables.

    The :py:attr:`renderer` attribute MUST be provided.
    """

    renderer: renderers.Renderer = None

    @action(detail=False, url_path="renderer")
    def get_renderer(self, request):
        """
        Return informations about the renderer used for transforming user
        content into django template.
        """
        if self.renderer is None:
            raise ValueError("Not renderer is provided.")

        ser = serializers.RendererSerializer(self.renderer)
        return Response(ser.data)
