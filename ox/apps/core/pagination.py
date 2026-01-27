from rest_framework import pagination


__all__ = ("PageNumberPagination",)


class PageNumberPagination(pagination.PageNumberPagination):
    """
    This is pagination used by default for Oxylus API views.

    It just adds ``page_size`` GET parameters to urls.
    """

    page_size_query_param = "page_size"
