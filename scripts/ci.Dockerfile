FROM python:3.12-slim

# Install Node.js 20 + build tools
RUN apt-get update && apt-get install -y curl build-essential \
    && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && npm install -g pnpm \
    && pip install --upgrade pip poetry dynaconf \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

WORKDIR /srv/oxylus

ENV OX_ENV=development

COPY pyproject.toml poetry.lock* ./
RUN poetry install --no-interaction
