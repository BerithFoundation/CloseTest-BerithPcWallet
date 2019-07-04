import { app, BrowserWindow, screen } from 'electron';
import * as path from 'path';
import * as url from 'url';

import {service} from './host/services'
import { exec } from 'child_process';

let win, serve;
const args = process.argv.slice(1);
serve = args.some(val => val === '--serve');

// (async () => {
//   try {
//     exec('taskkill /f /im berith.exe')
//   } catch (error) {
//   }
// });

function createWindow() {

  const electronScreen = screen;
  const size = electronScreen.getPrimaryDisplay().workAreaSize;


  win = new BrowserWindow({
    x: 0,
    y: 0,
    width: size.width,
    height: size.height,
    webPreferences: {
      nodeIntegration: true,
    },
    icon: path.join(__dirname, 'src/favicon.ico')
  });

  service(win)

  if (serve) {
    require('electron-reload')(__dirname, {
      electron: require(`${__dirname}/node_modules/electron`)
    });
    win.loadURL('http://localhost:4211');
  } else {
    win.loadURL(url.format({
      pathname: path.join(__dirname, 'dist/index.html'),
      protocol: 'file:',
      slashes: true
    }));
  }
  

//  win.webContents.openDevTools();
  if (serve) {
    win.webContents.openDevTools();
  }

  // Emitted when the window is closed.
  win.on('closed', async () => {
    //exec('taskkill /f /im berith.exe');
    win = null;
  });

}

try {

  app.on('ready', createWindow);
  app.on('window-all-closed', async () => { 
    //exec('taskkill /f /im berith.exe');
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
  
    if (win === null) {
      createWindow();
    }
  });

} catch (e) {
  
}
