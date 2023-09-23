import os
import json
from bs4 import BeautifulSoup
from easynmt import EasyNMT


model_name = os.getenv('EASYNMT_MODEL', 'opus-mt')
model_args = json.loads(os.getenv('EASYNMT_MODEL_ARGS', '{}'))

print("Load model: " + model_name)
model = EasyNMT(model_name, load_translator=True, **model_args)


def from_html(html: str, target_lang: str, source_lang: str = None):
    if "<body>" not in html:
        html = f'<html><body>{html}</body></html>'

    soup = BeautifulSoup(html, 'html.parser')

    ignore_tags = [
        'address', 'applet', 'audio', 'canvas', 'code',
        'embed', 'pre', 'script', 'style', 'time', 'video'
    ]

    if source_lang == '' or source_lang == None:
        source_lang = model.language_detection(soup.get_text())

    for node in soup.find_all(string=True):
        if not any(node.find_parent(tag) for tag in ignore_tags):
            translated = model.translate(node, target_lang, source_lang)
            if translated:
                node.replace_with(translated)

    result = ''.join(map(str, soup.body.contents))
    return result, source_lang


def from_text(text: str, target_lang: str, source_lang: str = None):
    if source_lang == '' or source_lang == None:
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
