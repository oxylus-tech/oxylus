#!/usr/bin/env bash
set -euo pipefail

# -----------------------------------------------------------------------------
# Oxylus Entrypoint
# -----------------------------------------------------------------------------
# Handles: virtualenv activation, first-time setup, migrations, assets, and start
# -----------------------------------------------------------------------------

export DJANGO_SETTINGS_MODULE="ox.settings.base"

APP_DIR="/srv/oxylus"
VENV_DIR="$APP_DIR/.venv"
SETTINGS_DIR="/etc/oxylus"
MANAGE="$APP_DIR/manage.py"

echo "🌳 Starting Oxylus container..."

#-----------------------------------------------------------------------------
# Activate virtualenv
#-----------------------------------------------------------------------------
if [ -d "$VENV_DIR" ]; then
    echo "📦 Activating existing virtualenv at $VENV_DIR"
    source "$VENV_DIR/bin/activate"
else
    echo "⚠️  No virtualenv found — creating one with Poetry"
    cd "$APP_DIR"
    poetry config virtualenvs.in-project true
    poetry install --no-dev --no-root
    source "$VENV_DIR/bin/activate"
fi


if [ ! -f "$APP_DIR/conf/.secrets.yaml" ]; then
    echo "⚙️ Setup project configuration..."
    python ./manage.py ox setup --default-admin
fi


#-----------------------------------------------------------------------------
# Start the application
#-----------------------------------------------------------------------------
case "${1:-run}" in
    run)
        echo "🚀 Starting Gunicorn..."
        exec gunicorn ox.wsgi:application \
            --bind 0.0.0.0:8000 \
            --workers "${GUNICORN_WORKERS:-3}" \
            --timeout 120
        ;;
    dev)
        echo "🧑‍💻 Running development server..."
        exec python "$MANAGE" runserver 0.0.0.0:8000
        ;;
    shell)
        exec python "$MANAGE" shell ${2:}
        ;;
    bash)
        exec bash
        ;;
    *)
        echo "🔧 Running custom command: $@"
        exec "$@"
        ;;
esac
