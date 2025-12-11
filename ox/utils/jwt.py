from datetime import datetime
from typing import Any

import jwt
from pydantic import BaseModel, field_validator

from django.conf import settings


__all__ = ("JWToken", "encode", "decode")


class JWToken(BaseModel):
    """
    A JSON Web Token to encode or decode.

    When :py:attr:`expiration` is provided, model validation checks that
    it is not expired.
    """

    expiration: datetime | None = None

    def encode(self, **kwargs):
        return encode(self.model_dump(mode="json"), **kwargs)

    @classmethod
    def decode(cls, jwt: str, **kwargs):
        data = decode(jwt, **kwargs)
        return cls.model_validate(data)

    @field_validator("expiration", mode="after")
    @classmethod
    def validate_expiration(cls, value):
        # We assume that datetime is local to server
        if value is not None and value < datetime.now():
            raise ValueError("This token is expired")
        return value


def encode(payload: dict[str, Any], headers=None, json_encoder=None, algorithm="HS256"):
    """
    Simple wrapper around pyjwt's encode, using configured key and HS256
    algorithm.
    """
    return jwt.encode(payload, settings.JWT_KEY, headers=headers, json_encoder=json_encoder, algorithm=algorithm)


def decode(value: str, algorithms=["HS256"], **kwargs) -> dict[str, Any] | JWToken:
    """
    Simple wrapper around pyjwt's decode, using configured key (and fallback keys).

    It will try to run over all keys provided by ``JWT_KEY`` and ``JWT_KEY_FALLBACKS``
    settings. If none succeed, will re-raise error that happened on the decoding using ``JWT_KEY``.

    :param jwt: the token to be decoded.
    :param **kwargs: extra parameters to pass to ``jwt.decode``.
    """
    keys = [settings.JWT_KEY, *settings.JWT_KEY_FALLBACKS]
    error = None

    for key in keys:
        try:
            return jwt.decode(value, key, algorithms=algorithms, **kwargs)
        except Exception as err:
            if error is None:
                error = err
    raise error
