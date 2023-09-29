import { platform } from 'os'


// 重写环境变量

const env = process.env || {};

env.NODE_ENV = env.NODE_ENV === 'production' ? 'production' : 'developement';

env.BROWSER_CHANNEL = platform() === 'win32' ? 'msedge' : '';
env.BROWSER_HANDLESS = env.NODE_ENV == 'production';

env.WORKER_NUMBER = env.WORKER_NUMBER > 0 ? env.WORKER_NUMBER : 1;

env.LISTEN_HOST = env.LISTEN_HOST || '127.0.0.1';
env.LISTEN_PORT = env.LISTEN_PORT || '8000';

// 导出环境变量

export default {
    ...env,
    // 修复变量类型
    BROWSER_HANDLESS: env.BROWSER_HANDLESS === 'true'
}
