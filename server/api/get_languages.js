import app from 'webox-node';
import { languages } from '../library/helper.js';


app.use({
    route: '/api/get_languages',
    async handle(request, response) {
        const params = request.requestURL.searchParams;
        const select = params.get('source_lang') || params.get('target_lang') || '';

        const output = languages.filter(v => v != select);

        app.helper.httpMessage(response, output);
        return true;
    },
});
