import os
import json
from bs4 import BeautifulSoup
from easynmt import EasyNMT


model_name = os.getenv('EASYNMT_MODEL', 'opus-mt')
model_args = json.loads(os.getenv('EASYNMT_MODEL_ARGS', '{}'))

print("Load model: " + model_name)
model = EasyNMT(model_name, load_translator=True, **model_args)


def translate(text: str, target_lang: str, source_lang: str = None, is_html: bool = False):
    if is_html:
        return translate_html(text, target_lang, source_lang)
    else:
        return translate_text(text, target_lang, source_lang)


def translate_html(text: str, target_lang: str, source_lang: str = None):
    if "<body>" not in text:
        text = f'<html><body>{text}</body></html>'

    soup = BeautifulSoup(text, 'html.parser')

    ignore_tags = [
        'address', 'applet', 'audio', 'canvas', 'code',
        'embed', 'pre', 'script', 'style', 'time', 'video'
    ]

    if not source_lang:
        source_lang = model.language_detection(soup.get_text())

    for node in soup.find_all(string=True):
        if not any(node.find_parent(tag) for tag in ignore_tags):
            translated = model.translate(node, target_lang, source_lang)
            if translated:
                node.replace_with(translated)

    result = ''.join(map(str, soup.body.contents))
    return result, source_lang


def translate_text(text: str, target_lang: str, source_lang: str = None):
    if not source_lang:
        source_lang = model.language_detection(text)

    result = model.translate(text, target_lang, source_lang)
    return result, source_lang


def get_languages(source_lang: str = None, target_lang: str = None):
    return model.get_languages(source_lang, target_lang)


def language_detection(text: str):
    return model.language_detection(text)


def model_name():
    return model._model_name


def lang_pairs():
    return model.lang_pairs
