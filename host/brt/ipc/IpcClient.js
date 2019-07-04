const net = require('net')
const EventEmitter = require('events');
const util = require('util');
var logger = require('../log/logger');

const st = require('./state')
const ev = require('./event')

var electron = require("electron");

var connectFailCnt = 0;

//Event
function IPCEventHanadler() {    
    EventEmitter.call(this);
}
util.inherits(IPCEventHanadler, EventEmitter);

class IpcClient {    
    constructor() {
        this.socket = null;        
        
        this.IpcEvent = new IPCEventHanadler();
        // 요청 SEQ. 요청시 마다 1씩 증가함
        this.callSeq = 0;
    }
    
    //IPC Connect
    async Connect(path) {
        return new Promise((resolve, reject) => {
            setTimeout(()=>{
                var rs = {
                    result : false,
                    msg : ""
                }
                if(this.socket != null){
                    rs.msg = "already connected"
                    logger.debug("**IPC SOCKET NULL** :: " + "already connected");
                    reject(rs);
                    return
                } 
                if(this.socket != null){
                    this.socket.removeAllListeners('end');
                    this.socket.removeAllListeners('data');
                    this.socket.removeAllListeners('error');
                }
                  
                this.socket = net.createConnection({
                    path: path
                }, () => {
                    this.socket.on('end', () => {
                        logger.debug("**IPC SOCKET EVENT END** :: " + "Socket END");
                        this.IpcEvent.emit(ev.STATE, st.END, "", this.socket);                   
                    }).on('data',  (data) => {
                        var d = data.toString();      
                        logger.debug("**IPC SOCKET EVENT DATA** " + d);
                        this.IpcEvent.emit(ev.RECV, d, this.socket);                    
                    });  
                    rs.result = true;
                    logger.debug("**IPC SOCKET CONNECT --- SUCCESS**");
                    console.log("connect sucsess :::::::::: " + rs.result)
                    resolve(rs);
                }).on('error', (error) => {
                    rs.result = false;
                    rs.msg = error.message

                    connectFailCnt++;
                    console.log("connect fail :::::::: " + connectFailCnt + " times")
                    logger.error("**IPC SOCKET EVENT ERROR** :: " + error.message);

                    if (connectFailCnt == 5) {
                        console.log('SHOW MESSAGE');
                        const options = {
                            type: 'error',
                            buttons: ['지금 재시작', '지금 종료'],
                            defaultId: 0,
                            title: '오류',
                            message: '노드가 응답하지 않습니다.',
                            detail: '노드가 실행중인지 확인하고 재시작 하십시오.',
                            //checkboxLabel: 'Remember my answer',
                            //checkboxChecked: true,
                        };
                        
                        electron.dialog.showMessageBox(null, options, (response) => {
                            console.log(response);
                            if (response == 0) {
                                electron.app.relaunch({ args: process.argv.slice(1).concat(['--relaunch']) })
                                // electron.app.quit();
                                electron.app.exit(0)
                            } else {
                                electron.app.quit();
                                electron.app.exit(0);
                            }
                        });
                        return false;
                    } else if (connectFailCnt >= 10) {
                        electron.app.quit();
                        electron.app.exit(0);
                    }

                    reject(rs);
                })
               
            }, 500);
        });
       
    }
    
    //IPC Send
    Send(obj){
        return new Promise((resolve, reject) => {
            setTimeout(()=> {
                try {
                    if(this.socket == null){
                        var rs = {
                            result : false,
                            msg : "not connected"
                        }
                        logger.debug("**IPC SEND NULL** :: " + "not connected");
                        reject(rs);
                        return;
                    }
                    // id에 '#시퀀스'를 붙임. 전송 데이터 대한 응답 데이터를 찾을 때 이 id가 같은지 확인
                    obj.send.id = obj.send.id + "#" + (++this.callSeq);
                    this.socket.write(JSON.stringify(obj.send),() => {
                        var rs = {
                            result : true,
                            msg : ''
                        }
                        resolve(rs);
                    })
                } catch (error) {
                    var rs = {
                        result : false,
                        msg : error
                    }
                    logger.error("**IPC SOCKET SEND** :: " + error.message);
                    reject(rs);
                }
                
            });          

        }, 100);
        
    }
        
}

module.exports = IpcClient;