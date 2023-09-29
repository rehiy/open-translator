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
            await deepl.init(this.browser);
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
        this.source_lang = '';
        this.target_lang = '';

        this.page = null;
        this.sourceBox = null;
        this.targetBox = null;
    }

    async init(browser) {
        this.page = await browser.newPage();
        await this.page.goto('https://www.deepl.com/en/translator');
        [this.sourceBox, this.targetBox] = await this.page.getByRole('textbox').all();
    }

    async getSourceLang() {
        const lang = await this.sourceBox.getAttribute('lang');
        return lang.split('-')[0];
    }

    async setSourceLang(lang) {
        if (this.source_lang !== lang) {
            this.source_lang = lang = lang || 'auto';
            await this.page.getByTestId('translator-source-lang-btn').click();
            await this.page.getByTestId('translator-lang-option-' + lang).click();
        }
    }

    async setTargetLang(lang) {
        if (this.target_lang !== lang) {
            this.target_lang = lang = lang || 'zh';
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
                        source_lang: this.source_lang,
                        target_lang: this.target_lang,
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
