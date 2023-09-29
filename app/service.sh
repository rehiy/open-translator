#!/bin/sh
#

[ -z "$NODE_ENV" ] && NODE_ENV=production

[ -z "$WORKER_NUMBER" ] && WORKER_NUMBER=2

[ -z "$LISTEN_HOST" ] && LISTEN_HOST=0.0.0.0
[ -z "$LISTEN_PORT" ] && LISTEN_PORT=80

exec npm start
