#!/bin/bash
#

# turn on bash's job control
set -m

# Create cache dir
mkdir -p $TORCH_CACHE
mkdir -p $TRANSFORMERS_CACHE
mkdir -p $EASYNMT_CACHE

# Download the needed model
python -c "import os; from easynmt import EasyNMT; EasyNMT(os.getenv('EASYNMT_MODEL', 'opus-mt'))"

# Start the primary process and put it in the background
/app/start_backend.sh &

# Start the helper process
/app/start_frontend.sh &

# Naive check if both processes are still running
while sleep 60; do
  ps aux | grep frontend.py | grep -q -v grep
  PROCESS_1_STATUS=$?
  ps aux | grep backend.py | grep -q -v grep
  PROCESS_2_STATUS=$?

  if [ $PROCESS_1_STATUS -ne 0 -o $PROCESS_2_STATUS -ne 0 ]; then
    echo "One of the processes has already exited."
    exit 1
  fi
done
