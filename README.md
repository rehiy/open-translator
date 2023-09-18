# Open Translator

- Friendly web-gui
- State-of-the-art neural machine translation
- Automatic download of pre-trained machine translation models

## Usage

Install with docker, and open `http://your-server` in your browser

```shell
docker run --name translator -d \
    --env EASYNMT_MODEL=opus-mt \
    --volume ./cache:/cache \
    rehiy/open-translator
```

## Available Models

The following models are currently available. They provide translations between 150+ languages.

| Model        | Reference                                                                                 | #Languages |  Size  |
| ------------ | ----------------------------------------------------------------------------------------- | :--------: | :----: |
| opus-mt      | [Helsinki-NLP](https://github.com/Helsinki-NLP/Opus-MT)                                   |    186     | 300 MB |
| mbart50_m2m  | [Facebook Research](https://github.com/pytorch/fairseq/tree/master/examples/multilingual) |     52     | 2.3 GB |
| m2m_100_1.2B | [Facebook Research](https://github.com/pytorch/fairseq/tree/master/examples/m2m_100)      |    100     | 5.0 GB |

## More Infomation

For more infomation, please visit [EasyNMT](https://github.com/UKPLab/EasyNMT)
