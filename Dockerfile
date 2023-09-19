FROM python:3.8-slim

LABEL version="1.1.0" \
      maintainer="wang@rehiy.com"

ADD app /app
WORKDIR /app/

RUN sh /app/deploy

ENV PYTHONPATH=/app
ENV TORCH_CACHE=/cache/torch
ENV TRANSFORMERS_CACHE=/cache/transformers
ENV EASYNMT_CACHE=/cache/easynmt
ENV EASYNMT_MODEL=opus-mt

EXPOSE 80

CMD  ["/app/start.sh"]
