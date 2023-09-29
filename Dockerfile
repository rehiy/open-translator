FROM mcr.microsoft.com/playwright:v1.38.0-jammy

LABEL version="1.1.0" \
      maintainer="wang@rehiy.com"

ADD public /app/public
ADD server /app/server
ADD package.json /app/package.json

WORKDIR /app/
RUN npm intall

ENV NODE_ENV=production
ENV WORKER_NUMBER=2

CMD  ["npm", "start"]
