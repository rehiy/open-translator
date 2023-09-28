# Open Translator

- Friendly web-gui
- Permanently free DeepL API

## Usage

Install with docker, and open `http://your-server` in your browser

```shell
docker run --name translator -d \
    --env WORKER_COUNT=1 \
    rehiy/open-translator:deepl
```
