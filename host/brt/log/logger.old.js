//임시 로그파일용 Log4js 로 변경 해야함
var log = require('log-to-file');
var mkdirp = require('mkdirp');
const homedir = require('os').homedir();

var path = null;
var file = "berith_wallet.log";
var debugLog = true;

function getUserHome() {
    return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
}

module.exports = {
    info(str){
        if(path == null){
            path = getUserHome();
            if(process.platform == 'win32'){
                path += "/AppData/Local/berith/wlog"
            } else {
                path += "/berith/wlog"
            }
        }

        mkdirp(path, (err) => { 
            if(err == null){
                log("[info] :: " + str, path + "/" + file);
            } else {
                console.log(err);
            }
            
        });
        
    },
    debug(str){
        if(debugLog == false) {
            return;
        }
        if(path == null){
            path = getUserHome();
            if(process.platform == 'win32'){
                path += "/AppData/Local/berith/wlog"
            } else {
                path += "/berith/wlog"
            }
        }

        mkdirp(path, (err) => { 
            if(err == null){
                log("[debug] :: " + str, path + "/" + file);
            } else {
                console.log(err);
            }
            
        });
        
    },    
    err(str){
        if(path == null){
            path = getUserHome();
            if(process.platform == 'win32'){
                path += "/AppData/Local/berith/wlog"
            } else {
                path += "/berith/wlog"
            }
        }

        mkdirp(path, (err) => { 
            if(err == null){
                log("[err] :: " + str, path + "/" + file);
            } else {
                console.log(err);
            }
            
        });
    },    
    error(str){
        if(path == null){
            path = getUserHome();
            if(process.platform == 'win32'){
                path += "/AppData/Local/berith/wlog"
            } else {
                path += "/berith/wlog"
            }
        }

        mkdirp(path, (err) => { 
            if(err == null){
                log("[err] :: " + str, path + "/" + file);
            } else {
                console.log(err);
            }
            
        });
    }
}

module.exports.LOGPATH = path;
module.exports.LOGFILE = file;
module.exports.SHOW_DEBUGLOG = debugLog;
