var log4js = require('log4js');
var logger = log4js.getLogger();
logger.level = 'debug'; // default level is OFF - which means no logs at all.
logger.debug("Some debug messages");

var mkdirp = require('mkdirp');
const homedir = require('os').homedir();

var path = null;
var file = "berith_wallet.log";
var debugLog = true;

function getUserHome() {
    return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
}

path = getUserHome();
if(process.platform == 'win32'){
    path += "/AppData/Local/berith/wlog"
} else {
    path += "/berith/wlog"
}

log4js.configure({
appenders: {
    console: { type: 'console' },
    everything: { type: 'dateFile', filename: path + '/' + file, pattern: '.yyyy-MM-dd-hh', compress: true }
},
categories: {
    default: { appenders: [  'everything' ], level: 'debug'}
}
});
    
module.exports = logger;
module.exports.LOGPATH = path;
module.exports.LOGFILE = file;
module.exports.SHOW_DEBUGLOG = debugLog;
