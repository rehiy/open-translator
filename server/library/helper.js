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
    // 启动翻译服务
    const WORKER_COUNT = process.env.WORKER_COUNT || 0;
    await deeplx.init(WORKER_COUNT > 0 ? +WORKER_COUNT : 1);
    // 启动HTTP服务
    app.init({
        WEBOX_HOST: process.env.LISTEN_HOST || '127.0.0.1',
        WEBOX_PORT: process.env.LISTEN_PORT || '8000',
        WEBOX_ROOT: './public',
    });
}
