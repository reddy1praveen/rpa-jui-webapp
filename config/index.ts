import { application } from './application.config';

import * as local from './environments/local.config';
import * as docker from './environments/docker.config';
import * as spreview from './environments/spreview.config';
import * as saat from './environments/saat.config';
import * as sprod from './environments/sprod.config';
import * as preview from './environments/preview.config';
import * as demo from './environments/demo.config';
import * as aat from './environments/aat.config';
import * as prod from './environments/prod.config';
import * as mock from './environments/mock.config';
import * as process from 'process';

const configs = {
    local,
    docker,
    spreview,
    saat,
    sprod,
    preview,
    demo,
    aat,
    prod,
    mock,
    microservice: 'jui_webapp',
    idam_client: 'juiwebapp',
    oauth_callback_url: 'oauth2/callback',
    protocol: 'https'

};

const loggingConfig = {
    "appenders": {
        "access": {
            "type": "dateFile",
            "filename": "log/access.log",
            "pattern": "-yyyy-MM-dd",
            "category": "http"
        },
        "app": {
            "type": "file",
            "filename": "log/app.log",
            "maxLogSize": 10485760,
            "numBackups": 3
        },
        "errorFile": {
            "type": "file",
            "filename": "log/errors.log"
        },
        "errors": {
            "type": "logLevelFilter",
            "level": "ERROR",
            "appender": "errorFile"
        }
    },
    "categories": {
        "default": { "appenders": ["app", "errors"], "level": "DEBUG" },
        "http": { "appenders": ["access"], "level": "DEBUG" }
    }
}

export const configEnv = process ? process.env.JUI_ENV || 'local' : 'local';
export const config = { ...configs[configEnv].default, ...application };
export const logConfig = { ...loggingConfig }
console.log(config);

if (configEnv === 'local') {
    config.protocol = 'http';
}

console.log('Using', configEnv, 'Config');
