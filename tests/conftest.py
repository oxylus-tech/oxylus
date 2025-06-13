import pytest

from django.test import RequestFactory
from django.contrib.auth.models import AnonymousUser, User


req_factory = RequestFactory()


# ---- Users & Groups
@pytest.fixture
def user(db):
    return User.objects.create_user(
        username="test-user", password="test", first_name="test", last_name="user", email="test@user.org"
    )


@pytest.fixture
def user_2(db):
    return User.objects.create_user(
        username="test-2-user", password="test-2", first_name="test-2", last_name="user", email="test-2@user.org"
    )


@pytest.fixture
def staff_user(db):
    return User.objects.create_user(username="staff-user", password="test", is_staff=True)


@pytest.fixture
def anon_user():
    return AnonymousUser()


# ----  Agents
@pytest.fixture
def agent(user):
    return user.agent


@pytest.fixture
def agent_2(user_2):
    return user_2.agent


# ---- Simple GET requests
@pytest.fixture
def user_request(user):
    req = req_factory.get("/")
    req.user = user
    return req


@pytest.fixture
def staff_request(staff_user):
    req = req_factory.get("/")
    req.user = staff_user
    return req


@pytest.fixture
def anon_request(anon_user):
    req = req_factory.get("/")
    req.user = anon_user
    return req
