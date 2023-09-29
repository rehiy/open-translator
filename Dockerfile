FROM python:3.8-slim

LABEL version="1.1.0" \
      maintainer="wang@rehiy.com"

ADD app /app

WORKDIR /app/
RUN sh /app/setup.sh

EXPOSE 80

CMD  ["/app/service.sh"]
