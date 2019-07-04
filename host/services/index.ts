import { ipcMain, BrowserWindow, dialog, app } from 'electron';


import * as berithapi from '../brt/berithapi';
import * as PersonalService from '../service/personal';
import * as BerithService from '../service/berith'
import * as MinerService from '../service/miner'
import * as TxPoolService from '../service/txpool'
import * as PollingService from  '../service/pollingService' 
import * as CmdService from '../services/cmdService'
import { DatabaseService } from '../services/databaseService'

export const service = async function(win: BrowserWindow){
    
    var rs = berithapi.Connect('\\\\.\\pipe\\ber.ipc');
        
    berithapi.addService(new BerithService(ipcMain , win));
    berithapi.addService(new MinerService(ipcMain , win));
    berithapi.addService(new PersonalService(ipcMain , win));
    berithapi.addService(new TxPoolService(ipcMain , win));
    var database = new DatabaseService('database');
    
    var poll = new PollingService(berithapi.router, database, win);
    poll.start()
}
