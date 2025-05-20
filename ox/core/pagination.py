from rest_framework import pagination


__all__ = ("PageNumberPagination",)


class PageNumberPagination(pagination.PageNumberPagination):
    page_size_query_param = "page_size"
