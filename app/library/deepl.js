import { chromium } from 'playwright';

import env from '../env.js';


export class DeepLx {

    constructor() {
        this.browser = null;
        this.worker = [];
    }

    async init() {
        console.log('[DeepLx] Prepare browser ...');
        this.browser = await chromium.launch({
            channel: env.BROWSER_CHANNEL,
            headless: env.BROWSER_HANDLESS === 'true'
        });
        for (let i = env.WORKER_NUMBER; i > 0; i--) {
            console.log(`[DeepLx] Prepare worker:${i} ...`);
            const deepl = new DeepL();
            await deepl.init(
                await this.browser.newContext()
            );
            this.worker.push(deepl);
        }
        console.log('[DeepLx] Prepare done, worker count:', this.worker.length);
    }

    async translate(text, tl, sl) {
        for (const deepl of this.worker) {
            if (deepl.idle) {
                return await deepl.translateText(text, tl, sl);
            }
        }
        return { error: 'busy' };
    }

}

export class DeepL {

    constructor() {
        this.idle = true;
        this.sourceLang = '';
        this.targetLang = '';

        this.page = null;
        this.sourceBox = null;
        this.targetBox = null;

        this.targetLangMap = {
            en: 'en-US', pt: 'pt-PT',
        };
    }

    async init(context) {
        this.page = await context.newPage();
        this.page.route(/(gif|statistics)$/, r => r.abort());
        await this.page.goto('https://www.deepl.com/en/translator');
        [this.sourceBox, this.targetBox] = await this.page.getByRole('textbox').all();
    }

    async getSourceLang() {
        const lang = await this.sourceBox.getAttribute('lang');
        return lang.split('-')[0];
    }

    async setSourceLang(lang) {
        if (this.sourceLang !== lang) {
            this.sourceLang = lang = lang || 'auto';
            await this.page.getByTestId('translator-source-lang-btn').click();
            await this.page.getByTestId('translator-lang-option-' + lang).click();
        }
    }

    async setTargetLang(lang) {
        if (this.targetLang !== lang) {
            this.targetLang = lang = lang || 'zh';
            this.targetLangMap[lang] && (lang = this.targetLangMap[lang]);
            await this.page.getByTestId('translator-target-lang-btn').click();

            await this.page.getByTestId('translator-lang-option-' + lang).click();
        }
    }

    async translateText(text, tl, sl) {
        this.idle = false;
        await this.setSourceLang(sl);
        await this.setTargetLang(tl);
        await this.sourceBox.click();
        await this.sourceBox.fill('');
        await this.sourceBox.fill(text);
        return new Promise(resolve => {
            let intervalTimes = 300;
            const checkin = async () => {
                const translated = await this.targetBox.innerText();
                if (translated && translated.trim() !== '') {
                    this.idle = true;
                    return resolve({
                        translated: translated.trim(),
                        source_lang: this.sourceLang,
                        target_lang: this.targetLang,
                        detected_lang: await this.getSourceLang(),
                    });
                }
                if (--intervalTimes < 0) {
                    return this.idle = true;
                }
                setTimeout(checkin, 100);
            };
            checkin();
        });
    }

}
