# Open Source Neural Machine Translation

Document language：[English](./README.md) | [简体中文](./README-zh.md)

- User-friendly web graphical interface
- Advanced neural machine translation technology
- Automatic download of pre-trained machine translation models

## Quick Start

Install using Docker and open in your browser at `http://your-server`

```shell
docker run --name mynmt -d \
    --env EASYNMT_MODEL=mbart50_m2m \
    --volume ./cache:/cache \
    rehiy/open-translator
```

- Initial usage requires model download and may take a while to start; you can check the progress with `docker logs -f mynmt`
- Keep the `/cache` directory to avoid re-downloading models when updating

## Native Deployment

- Download the project and extract the `app` folder to the system root directory.
- Install Python 3 and execute the following code:

```shell
/app/setup.sh
/app/service.sh
```

## Environment Variables

You can control the Docker image using various environment variables:

### Gunicorn

- *BIND*: Service Listening Address. Default: 0.0.0.0:80
- *MAX_WORKERS*: Number of worker processes for the translation. Default: 1

### Easy NMT

- *EASYNMT_MODEL*: Which EasyNMT Model to load. Default: opus-mt
- *EASYNMT_MODEL_ARGS*: Json encoded string with parameters when loading EasyNMT: Default: {}

## Available Models

The system defaults to using the `opus-mt` model, which has a smaller size and faster response speed. If you are not satisfied with the translation results, you can try loading other models by simply changing the value of `EASYNMT_MODEL`.

| Model        | Reference Link                                                                            | Languages |  Size  |
| ------------ | ----------------------------------------------------------------------------------------- | :-------: | :----: |
| opus-mt      | [Helsinki-NLP](https://github.com/Helsinki-NLP/Opus-MT)                                   |    186    | 300 MB |
| mbart50_m2m  | [Facebook Research](https://github.com/pytorch/fairseq/tree/master/examples/multilingual) |    52     | 2.3 GB |
| m2m_100_1.2B | [Facebook Research](https://github.com/pytorch/fairseq/tree/master/examples/m2m_100)      |    100    | 5.0 GB |

## More Information

For more information, please visit [EasyNMT](https://github.com/UKPLab/EasyNMT).
