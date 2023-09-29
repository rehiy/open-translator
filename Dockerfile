FROM mcr.microsoft.com/playwright:v1.38.0-jammy

LABEL version="1.1.0" \
      maintainer="wang@rehiy.com"

ADD app /app

WORKDIR /app/
RUN sh /app/setup.sh

ENV NODE_ENV=production
ENV WORKER_NUMBER=2

CMD  ["/app/service.sh"]
