"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var child_process_1 = require("child_process");
exports.spawnCmd = function (win, cmd, args, callback) {
    var loaded = false;
    var ls = child_process_1.spawn(cmd, args);
    var startMsg = 'IPC endpoint opened';
    // const startMsg = 'Welcome to the Berith JavaScript console!';
    ls.stdout.on('data', function (data) {
        if (loaded) {
            sendStdOut(win, 'stdout', "stdout: " + data);
        }
    });
    ls.stderr.on('data', function (data) {
        if (loaded) {
            sendStdOut(win, 'stderr', "stdout: " + data);
        }
        else {
            if (data.toString().indexOf(startMsg) > -1) {
                callback();
                console.log('loaded !!!!!!!!!!!!!!!!!!!!!!!!!!!');
                loaded = true;
            }
        }
    });
    ls.on('close', function (code) {
        sendStdOut(win, 'close', "child process exited with code " + code);
    });
};
function sendStdOut(win, type, data) {
    if (type == 'stdout') { // out
        console.log(type + ": " + data);
    }
    else if (type == 'stderr') { // err
        console.error(type + ": " + data);
    }
    else {
        console.error(type + ": " + data);
    }
    win.webContents.send('berithOut', data);
}
// 사용안함
exports.execCmd = function (cmd) {
    return new Promise(function (resolve, reject) {
        child_process_1.exec(cmd, function (err, stdout, stderr) {
            if (err) {
                return reject(err);
            }
            resolve(stdout.trim());
        });
    });
};
//# sourceMappingURL=cmdService.js.map