#!/bin/bash
#

# turn on bash's job control
set -m

# Create cache dir
mkdir -p $TORCH_CACHE
mkdir -p $TRANSFORMERS_CACHE
mkdir -p $EASYNMT_CACHE

# Run preset script
echo "Run preset script ..."
python /app/preset.py

# Start gunicorn server
gunicorn -k "uvicorn.workers.UvicornWorker" -c "/app/service.py" "main:app"
