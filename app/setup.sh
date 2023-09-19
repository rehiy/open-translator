#!/bin/sh
#

chmod +x /app/*.sh

apt-get update && apt-get install -y wget procps build-essential

pip install --no-cache-dir torch==1.13.1+cpu -f https://download.pytorch.org/whl/torch_stable.html
pip install --no-cache-dir "uvicorn[standard]" gunicorn fastapi langid sacremoses easynmt

python -m nltk.downloader 'punkt'

# clear files

apt-get remove -y build-essential
apt-get autoremove -y

rm -rf /var/lib/apt/lists
rm -rf /var/cache/debconf/*-old

rm -rf /app/setup.sh