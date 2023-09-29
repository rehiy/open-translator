import app from 'webox-node';

import { deeplx } from '../library/helper.js';


app.use({
    route: '/api/translate',
    async handle(request, response) {
        const post = request.postData || {};

        let output = await deeplx.translate(
            post.text, post.target_lang, post.source_lang
        );

        app.helper.httpMessage(response, output);
        return true;
    },
});
