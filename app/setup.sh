#!/bin/sh
#

chmod +x /app/*.sh

npm install

# clear files

apt-get autoremove -y

rm -rf ~/.npm
rm -rf /var/lib/apt/lists
rm -rf /var/cache/debconf/*-old

rm -rf /app/setup.sh
