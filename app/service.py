import os
import json


bind = os.getenv("BIND", "0.0.0.0:80")
workers = os.getenv("MAX_WORKERS", "1")
loglevel = os.getenv("LOG_LEVEL", "info")
errorlog = os.getenv("ERROR_LOG", "-") or None
accesslog = os.getenv("ACCESS_LOG", "-") or None
graceful_timeout = int(os.getenv("GRACEFUL_TIMEOUT", "120"))
timeout = int(os.getenv("TIMEOUT", "120"))
keepalive = int(os.getenv("KEEP_ALIVE", "5"))
worker_tmp_dir = "/dev/shm"


# For debugging
log_data = {
    "bind": bind,
    "workers": workers,
    "loglevel": loglevel,
    "errorlog": errorlog,
    "accesslog": accesslog,
    "graceful_timeout": graceful_timeout,
    "timeout": timeout,
    "keepalive": keepalive,
}
print(json.dumps(log_data))
