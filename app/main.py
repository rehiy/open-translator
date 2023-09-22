from typing import Optional
from fastapi import FastAPI, HTTPException, Request
from fastapi.staticfiles import StaticFiles
from helper import translate


app = FastAPI()


@app.get("/translate")
async def translate(target_lang: str, text: str, source_lang: str = None):
    """
    Translates the text to the given target language.
    :param text: Text that should be translated
    :param target_lang: Target language
    :param source_lang: Language of text. Optional, if empty: Automatic language detection
    :return: Returns a json with the translated text
    """
    output = {"target_lang": target_lang, "source_lang": source_lang}
    try:
        output["translated"], output["detected_langs"] = translate.with_text(text, target_lang, source_lang)
    except Exception as e:
        raise HTTPException(403, detail="Error: "+str(e))
    return output


@app.post("/translate")
async def translate_post(request: Request):
    """
    Post method for translation
    :return:
    """
    data = await request.json()
    return await translate(**data)


@app.get("/translate_html")
async def translate_html(target_lang: str, html: str, source_lang: str = None):
    """
    Translates the html to the given target language.
    :param html: Html that should be translated
    :param target_lang: Target language
    :param source_lang: Language of html. Optional, if empty: Automatic language detection
    :return: Returns a json with the translated html
    """
    output = {"target_lang": target_lang, "source_lang": source_lang}
    try:
        output["translated"], output["detected_langs"] = translate.with_html(html, target_lang, source_lang)
    except Exception as e:
        raise HTTPException(403, detail="Error: "+str(e))
    return output


@app.post("/translate_html")
async def translate_post(request: Request):
    """
    Post method for translation
    :return:
    """
    data = await request.json()
    return await translate_html(**data)


@app.get("/lang_pairs")
async def lang_pairs():
    """
    Returns the language pairs from the model
    :return:
    """
    return translate.lang_pairs()


@app.get("/get_languages")
async def get_languages(source_lang: str = None, target_lang: str = None):
    """
    Returns the languages the model supports
    :param source_lang: Optional. Only return languages with this language as source
    :param target_lang: Optional. Only return languages with this language as target
    :return:
    """
    return translate.get_languages(source_lang, target_lang)


@app.get("/language_detection")
async def language_detection(text: str):
    """
    Detects the language for the provided text
    :param text: A single text for which we want to know the language
    :return: The detected language
    """
    return translate.language_detection(text)


@app.get("/model_name")
async def model_name():
    """
    Returns the name of the loaded model
    :return: EasyNMT model name
    """
    return translate.model_name()


app.mount("/", StaticFiles(directory="/app/public", html=True), name="public")
