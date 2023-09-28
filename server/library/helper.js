import app from 'webox-node';
import { DeepLx } from './deepl.js';


// 语言列表

export const languages = [
    'en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'pl', 'ru', 'ja', 'zh', 'bg', 'hr', 'cs', 'da', 'et', 'fi',
    'el', 'hu', 'is', 'ga', 'lv', 'lt', 'mt', 'no', 'ro', 'sk', 'sl', 'sv', 'id', 'tr', 'uk', 'ko', 'nb'
];

// 启动服务

export const deeplx = new DeepLx();

export async function bootsrap() {
    const WORKER_COUNT = process.env.WORKER_COUNT || 0;
    await deeplx.init(WORKER_COUNT > 0 ? +WORKER_COUNT : 1);
    app.init({
        WEBOX_MODE: 'production',
        WEBOX_ROOT: './public',
        WEBOX_HOST: '0.0.0.0',
        WEBOX_PORT: '8000',
    });
}
