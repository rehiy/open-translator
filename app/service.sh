#!/bin/bash
#

# turn on bash's job control
set -m

# Define env vars
export TORCH_CACHE=${TORCH_CACHE:-"/cache/torch"}
export TRANSFORMERS_CACHE=${TRANSFORMERS_CACHE:-"/cache/transformers"}
export EASYNMT_CACHE=${EASYNMT_CACHE:-"/cache/easynmt"}
export EASYNMT_MODEL=${EASYNMT_MODEL:-"opus-mt"}

# Create cache dir
[ -d $TORCH_CACHE ] || mkdir -p $TORCH_CACHE
[ -d $TRANSFORMERS_CACHE ] || mkdir -p $TRANSFORMERS_CACHE
[ -d $EASYNMT_CACHE ] || mkdir -p $EASYNMT_CACHE

# Run preset script
echo "Run preset script ..."
python /app/preset.py

# Start gunicorn server
gunicorn -k "uvicorn.workers.UvicornWorker" -c "/app/service.py" "main:app"
