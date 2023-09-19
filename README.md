# Open Source Neural Machine Translation

Document language：[English](./README.md) | [简体中文](./README-zh.md)

- User-friendly web graphical interface
- Advanced neural machine translation technology
- Automatic download of pre-trained machine translation models

## Usage

Install using Docker and open in your browser at `http://your-server`

```shell
docker run --name mynmt -d \
    --env EASYNMT_MODEL=mbart50_m2m \
    --volume ./cache:/cache \
    rehiy/open-translator
```

- Initial usage requires model download and may take a while to start; you can check the progress with `docker logs -f mynmt`
- Keep the `/cache` directory to avoid re-downloading models when updating

## Available Models

By default, the `opus-mt` model is used when the `EASYNMT_MODEL` environment variable is not specified. This model has a smaller size and faster response. If you are not satisfied with the translation results, you can also try loading the following models.

| Model        | Reference Link                                                                            | Languages |  Size  |
| ------------ | ----------------------------------------------------------------------------------------- | :-------: | :----: |
| opus-mt      | [Helsinki-NLP](https://github.com/Helsinki-NLP/Opus-MT)                                   |    186    | 300 MB |
| mbart50_m2m  | [Facebook Research](https://github.com/pytorch/fairseq/tree/master/examples/multilingual) |    52     | 2.3 GB |
| m2m_100_1.2B | [Facebook Research](https://github.com/pytorch/fairseq/tree/master/examples/m2m_100)      |    100    | 5.0 GB |

## More Information

For more information, please visit [EasyNMT](https://github.com/UKPLab/EasyNMT).