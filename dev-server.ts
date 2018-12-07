const app = require('./application');
const config = require('./config/index')

/**
 * Initialise log4js first, so we don't miss any log messages
 */
const log4js = require('log4js');

log4js.configure(config.logConfig);
const log = log4js.getLogger("startup");


app.listen(3001, () => log.info('Express server listening on port  3001!'));


