import app from 'webox-node';

import env from '../env.js';
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
    await deeplx.init();
    // 启动HTTP服务
    app.init({
        WEBOX_MODE: env.NODE_ENV,
        WEBOX_HOST: env.LISTEN_HOST,
        WEBOX_PORT: env.LISTEN_PORT,
        WEBOX_ROOT: './public',
    });
}
