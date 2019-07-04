import { exec, spawn } from "child_process";
import { appManage } from "../brt/appManage";

export const spawnCmd = (win, cmd: string, args, callback) => {
    let loaded = false;

    const ls = spawn(cmd, args);
    
    const startMsg = 'IPC endpoint opened';
    // const startMsg = 'Welcome to the Berith JavaScript console!';

    ls.stdout.on('data', (data) => {
      if (loaded) {
        sendStdOut(win, 'stdout', `stdout: ${data}`);
      }
    });

    ls.stderr.on('data', (data) => {
      if (loaded) {
        sendStdOut(win, 'stderr', `stdout: ${data}`);
      } else {
        if (data.toString().indexOf(startMsg) > -1) {
          callback();
          console.log('loaded !!!!!!!!!!!!!!!!!!!!!!!!!!!');
          loaded = true;
        }
      }
    });

    ls.on('close', (code) => {
      sendStdOut(win, 'close', `child process exited with code ${code}`);
    });
};

function sendStdOut(win, type, data) {
  if (type == 'stdout') { // out
    console.log(`${type}: ${data}`);
  } else if (type == 'stderr') { // err
    console.error(`${type}: ${data}`);
  } else {
    console.error(`${type}: ${data}`);
  }

  win.webContents.send('berithOut', data);
  
}

// 사용안함
export const execCmd = (cmd: string) => {
  return new Promise((resolve, reject) => {
    exec(cmd, (err, stdout, stderr) => {
      if (err) {
        return reject(err);
      }
      
      resolve(stdout.trim());
    });
  });
};