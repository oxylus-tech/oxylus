import pytest

from ox.utils import functional


@pytest.fixture
def A():
    class A:
        pass

    return A


@pytest.fixture
def B():
    class B:
        pass

    return B


@pytest.fixture
def C(A):
    class C(A):
        pass

    return C


def test_merge_bases_no_append(A, B, C):
    functional.merge_bases(C, [A, B], False)
    assert issubclass(C, A)
    assert issubclass(C, B)
    assert len(C.__bases__) == 2


def test_merge_bases_with_append(A, B, C):
    functional.merge_bases(C, [B], True)
    assert issubclass(C, A)
    assert issubclass(C, B)
    assert len(C.__bases__) == 2
