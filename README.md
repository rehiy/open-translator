# NLLB Serve

[NLLB Serve](https://github.com/thammegowda/nllb-serve) offers a web interface and REST API to Meta's No Language Left Behind (NLLB) models that can translate across 200 languages.

The purpose of this project is to automatically submit the nllb-server container mirror to the [docker hub](https://hub.docker.com/r/rehiy).

## Qiuck Start

```shell
docker run --name nllb-serve -d -p 6060:6060 rehiy/open-translator:nllb
docker logs -f nllb-serve
```
