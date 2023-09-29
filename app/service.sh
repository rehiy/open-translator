#!/bin/sh
#

[ -z "$NODE_ENV" ] && export NODE_ENV=production

[ -z "$WORKER_NUMBER" ] && export WORKER_NUMBER=2

[ -z "$LISTEN_HOST" ] && export LISTEN_HOST=0.0.0.0
[ -z "$LISTEN_PORT" ] && export LISTEN_PORT=80

exec npm start
