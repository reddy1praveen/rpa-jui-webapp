const app = require('./application');
// require( 'zone.js/dist/zone-node');
import * as express from 'express';
import * as path from 'path';

const ngExpressEngine = require('@nguniversal/express-engine').ngExpressEngine;
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const {
    AppServerModuleNgFactory,
    LAZY_MODULE_MAP
} = require('../jui-frontend/server/main');

const {
    provideModuleMap
} = require('@nguniversal/module-map-ngfactory-loader');

const provider = provideModuleMap(LAZY_MODULE_MAP);

app.engine(
    'html',
    ngExpressEngine({
        bootstrap: AppServerModuleNgFactory,
        providers: [provider]
    })
);


/**
 * Initialise log4js first, so we don't miss any log messages
 */
const log4js = require('log4js');
log4js.configure('./config/log4js.json');
const log = log4js.getLogger("startup");


app.set('view engine', 'html');
app.set('views', __dirname);

app.use(express.static(path.join(__dirname, '..', 'assets'), { index: false }));
app.use(express.static(path.join(__dirname, '..', 'jui-frontend', 'main'), { index: false }));

app.use('/*', (req, res) => {
    console.time(`GET: ${req.originalUrl}`);
    res.render('../jui-frontend/main/index', {
        req,
        res,
        providers: [
            { provide: 'REQUEST', useValue: req },
            { provide: 'RESPONSE', useValue: res }
        ]
    });
    console.timeEnd(`GET: ${req.originalUrl}`);
});

// app.listen(process.env.PORT || 3000, () => { });

var server = app.listen(app.get('port'), function () {
    log.info('Express server listening on port ', server.address().port, " with pid ", process.pid);
});
