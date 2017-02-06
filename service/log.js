/**
 * Created by johnnycage on 2017/1/19.
 */
var log4js = require('log4js');
log4js.loadAppender('file');
log4js.addAppender(log4js.appenders.file(__dirname + '/../logs/error.log'), 'error');
log4js.addAppender(log4js.appenders.file(__dirname + '/../logs/info.log'), 'info');
log4js.addAppender(log4js.appenders.file(__dirname + '/../logs/warn.log'), 'warn');

const errLogger = log4js.getLogger('error');
const infoLogger = log4js.getLogger('info');
const warnLogger = log4js.getLogger('warn');

module.exports = {
  error: (msg) => {
    errLogger.error(msg);
  },

  info: (msg) => {
    infoLogger.info(msg);
  },

  warn: (msg) => {
    warnLogger.warn(msg);
  },
};