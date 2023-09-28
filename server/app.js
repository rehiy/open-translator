import app from 'webox-node';

import './api/translate.js';
import './api/get_languages.js';

import { deeplx } from './library/helper.js';

(async () => {
    await deeplx.init(1);

    app.init({
        WEBOX_MODE: 'production',
        WEBOX_ROOT: './public',
        WEBOX_HOST: '0.0.0.0',
        WEBOX_PORT: '8000',
    });
})()
