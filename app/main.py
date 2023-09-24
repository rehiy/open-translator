from fastapi import FastAPI, HTTPException, Request
from fastapi.staticfiles import StaticFiles

from helper import easy


app = FastAPI()


@app.post("/translate")
async def translate(request: Request):
    """
    Translates the text to the given target language.
    :param text: Text that should be translated
    :param target_lang: Target language
    :param source_lang: Language of text. Optional, if empty: Automatic language detection
    :param is_html: Translate html code. Optional, if empty: false
    :return: Returns a json with the translated text
    """
    try:
        data = await request.json()
        data["translated"], data["detected_langs"] = easy.translate(**data)
    except Exception as e:
        raise HTTPException(403, detail="Error: "+str(e))
    return data


@app.get("/model_name")
async def model_name():
    """
    Returns the name of the loaded model
    :return: EasyNMT model name
    """
    return easy.model_name()


@app.get("/lang_pairs")
async def lang_pairs():
    """
    Returns the language pairs from the model
    :return:
    """
    return easy.lang_pairs()


@app.get("/get_languages")
async def get_languages(source_lang: str = None, target_lang: str = None):
    """
    Returns the languages the model supports
    :param source_lang: Optional. Only return languages with this language as source
    :param target_lang: Optional. Only return languages with this language as target
    :return:
    """
    return easy.get_languages(source_lang, target_lang)


@app.get("/language_detection")
async def language_detection(text: str):
    """
    Detects the language for the provided text
    :param text: A single text for which we want to know the language
    :return: The detected language
    """
    return easy.language_detection(text)


app.mount("/", StaticFiles(directory="/app/public", html=True), name="public")
