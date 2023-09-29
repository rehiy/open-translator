// add route

import './api/translate.js';
import './api/get_languages.js';

// app bootsrap

process.env.NODE_ENV = 'development'; // production

import { bootsrap } from './library/helper.js';

bootsrap();
