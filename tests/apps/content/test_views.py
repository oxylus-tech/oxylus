import pytest

from ox.apps.content import views

from tests.app.models import Message


@pytest.fixture
def message(user):
    return Message.objects.create(author=user, content="test 1")


@pytest.fixture
def message_1(user_1, message):
    return Message.objects.create(author=user_1, content="test 2", thread=message)


@pytest.fixture
def messages(message, message_1):
    return [message, message_1]


@pytest.fixture
def message_viewset(user_request):
    return views.MessageViewSet(request=user_request, queryset=Message.objects.all())


class TestMessageViewSet:
    def test_get_queryset(self, message_viewset, messages):
        query = message_viewset.get_queryset()
        assert list(query) == list(messages)

    def test_get_queryset_post_filters_by_author(self, message_viewset, messages, message):
        message_viewset.request.method = "post"
        query = message_viewset.get_queryset()
        assert list(query) == [message]
