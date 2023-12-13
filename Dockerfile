FROM python:3.8-bullseye

LABEL version="1.0.0" \
      maintainer="wang@rehiy.com"

ADD deploy /tmp/deploy
RUN sh /tmp/deploy

ENV CUDA_VISIBLE_DEVICES=""

ENTRYPOINT ["nllb-serve"]

EXPOSE 6060
