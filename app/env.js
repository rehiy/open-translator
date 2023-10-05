import { platform } from 'os'


const env = process.env || {};
export default env;

// 运行模式

env.NODE_ENV = env.NODE_ENV === 'production' ? 'production' : 'developement';

// PLAYWRIGHT 参数

env.BROWSER_CHANNEL = platform() === 'win32' ? 'msedge' : '';
env.BROWSER_HANDLESS = env.NODE_ENV == 'production' ? 'true' : 'false';

// DEEPL 最大进程数

env.WORKER_NUMBER = env.WORKER_NUMBER > 0 ? env.WORKER_NUMBER : 2;

// HTTP 监听地址

env.LISTEN_HOST = env.LISTEN_HOST || '127.0.0.1';
env.LISTEN_PORT = env.LISTEN_PORT > 0 ? env.LISTEN_PORT : '8000';
