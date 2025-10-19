# Stage 1: Builder
FROM python:3.13-slim AS builder

WORKDIR /srv/oxylus

# Install build tools
RUN apt-get update && apt-get install -y curl build-essential \
    && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs libmagic-dev \
    && npm install -g pnpm \
    && pip install --upgrade pip poetry dynaconf \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

COPY . .
COPY pyproject.toml poetry.lock manage.py ./
COPY ./README.rst ./README.rst
RUN poetry config virtualenvs.in-project true
RUN poetry lock
RUN poetry install --only=main --only=prod

ENV CI=true
RUN cd assets && pnpm install
RUN cd assets && pnpm run build
RUN OX_ENV=development poetry run ./manage.py collectassets


# Stage 2: Runtime image (lean)
FROM python:3.13-slim AS runtime

WORKDIR /srv/oxylus

# Copy built artifacts from builder
COPY ./manage.py .
COPY ./scripts/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

COPY --from=builder /srv/oxylus/ox ./ox
COPY --from=builder /srv/oxylus/pyproject.toml ./pyproject.toml
COPY --from=builder /srv/oxylus/poetry.lock ./poetry.lock
COPY --from=builder /srv/oxylus/README.rst ./README.rst
COPY --from=builder /srv/oxylus/.venv ./.venv

RUN apt-get update && apt-get install -y python3-poetry libpq5 libmagic-dev \
    && pip install --upgrade pip \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

ENV PATH="/srv/oxylus/.venv/bin:$PATH"
ENV PYTHONUNBUFFERED=1

RUN poetry config virtualenvs.in-project true
RUN poetry lock

EXPOSE 8000
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
CMD run
