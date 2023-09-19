# 开源神经机器翻译

文档语言：[English](./README.md) | [简体中文](./README-zh.md)

- 友好的 Web 图形界面
- 先进的神经机器翻译技术
- 自动下载预训练的机器翻译模型

## 使用方法

使用 Docker 安装，并在浏览器中打开 `http://your-server`

```shell
docker run --name mynmt -d \
    --env EASYNMT_MODEL=mbart50_m2m \
    --volume ./cache:/cache \
    rehiy/open-translator
```

- 首次使用需下载模型，会花费较长的时间启动，可通过`docker logs -f mynmt`查看进度
- 保留`/cache`目录，可避免更新时重复下载模型

## 可用模型

不指定环境变量`EASYNMT_MODEL`时，默认使用`opus-mt`模型，此模型容量较小、响应速度快。若对翻译结果不满意，还可以尝试加载以下模型。

| 模型         | 参考链接                                                                                  | 语言  |  大小  |
| ------------ | ----------------------------------------------------------------------------------------- | :---: | :----: |
| opus-mt      | [Helsinki-NLP](https://github.com/Helsinki-NLP/Opus-MT)                                   |  186  | 300 MB |
| mbart50_m2m  | [Facebook Research](https://github.com/pytorch/fairseq/tree/master/examples/multilingual) |  52   | 2.3 GB |
| m2m_100_1.2B | [Facebook Research](https://github.com/pytorch/fairseq/tree/master/examples/m2m_100)      |  100  | 5.0 GB |

## 环境变量

您可以使用各种环境变量来控制 Docker 镜像：

- *MAX_WORKERS*: 翻译的工作进程数量。默认值：1
- *EASYNMT_MODEL*: 要加载的 EasyNMT 模型。默认值：opus-mt
- *EASYNMT_MODEL_ARGS*: 在加载 EasyNMT 时带有参数的 JSON 编码字符串。默认值：{}
- *EASYNMT_MAX_TEXT_LEN*: 翻译的最大文本长度。默认值：未设置
- *EASYNMT_MAX_BEAM_SIZE*: 翻译的最大束搜索大小。默认值：未设置
- *EASYNMT_BATCH_SIZE*: 翻译的批处理大小。默认值：16
  
## 更多信息

欲了解更多信息，请访问 [EasyNMT](https://github.com/UKPLab/EasyNMT)。