import { platform } from 'os'


const env = process.env || {};
export default env;

env.NODE_ENV = env.NODE_ENV === 'production' ? 'production' : 'developement';

env.BROWSER_CHANNEL = platform() === 'win32' ? 'msedge' : '';
env.BROWSER_HANDLESS = env.NODE_ENV == 'production' ? 'true' : 'false';

env.WORKER_NUMBER = env.WORKER_NUMBER > 0 ? env.WORKER_NUMBER : 1;

env.LISTEN_HOST = env.LISTEN_HOST || '127.0.0.1';
env.LISTEN_PORT = env.LISTEN_PORT || '8000';
