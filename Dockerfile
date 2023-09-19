FROM python:3.8-slim

LABEL version="1.1.0" \
      maintainer="wang@rehiy.com"

ADD app /app

WORKDIR /app/
RUN sh /app/deploy

ENV PYTHONPATH=/app

EXPOSE 80

CMD  ["/app/service.sh"]
