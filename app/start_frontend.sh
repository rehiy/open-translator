#!/bin/sh -e
#

MODULE_NAME=${MODULE_NAME:-main}
VARIABLE_NAME=${VARIABLE_NAME:-app}

export APP_MODULE=${APP_MODULE:-"$MODULE_NAME:$VARIABLE_NAME"}
export GUNICORN_CONF=${GUNICORN_CONF:-"/app/gunicorn/frontend.py"}
export WORKER_CLASS=${WORKER_CLASS:-"uvicorn.workers.UvicornWorker"}

# Start Gunicorn
ROLE=FRONTEND exec gunicorn -k "$WORKER_CLASS" -c "$GUNICORN_CONF" "$APP_MODULE"
