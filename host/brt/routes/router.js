var Queue = require('../que/queue')
var IpcClient = require('../ipc/IpcClient')
var logger = require('../log/logger');
const st = require('../ipc/state')
const ev = require('../ipc/event')

var q = new Queue();
var client = new IpcClient();
var r = new Queue();
var ipc 
async function Timer() {
    setInterval(async ()=> {
        if(q.size() > 0){
            var v = q.dequeue();     
            await client.Send(v).then((resolve) => {                   
                logger.debug("**ROUTER SEND TIMER** ::" + JSON.stringify(v.send));
                r.enqueue(v);
            }, (reject) => {
                logger.error(JSON.stringify(reject));
            });
        }
    }, 100);
}

class Router {    
    constructor() {
        this._srv = [];
        // 로그 기록 여부. 큐에 하나 이상 쌓여있을 때만 로그에 기록하기 위함
        this.doLog = false; 

        client.IpcEvent.on(ev.STATE, (state, msg, socket) => {
            switch(state){
            case st.ERROR:{                
                console.log("event error :: " + msg);
                break
            }
            case st.SUCCESS:{
                break
            }
            case st.END:{
                console.log("event end :: " + msg);
                break
            }
            
            }
        });
        
        client.IpcEvent.on(ev.SEND, (msg, socket) =>{
            console.log(msg);
        });
        client.IpcEvent.on(ev.RECV, async (recv, socket) =>{
            try {
                var recv_data = JSON.parse(recv)
                var rid = recv_data["id"];

                
                this.doLog = r.size() > 1; // 큐에 하나 이상 쌓여있을 때
                this.log("/----------------------------------------------------");
                this.log('WELCOME! [' + rid + ']');
                
                var tempQueue = new Queue();
                
                // 디버깅을 위한 큐 내용을 출력 시작
                this.log(this.getIdString(r.all()) + ', ' + this.getIdString(tempQueue.all()));
                // 디버깅을 위한 큐 내용을 출력 끝

                var send_data = r.dequeue();
                var sid = send_data["send"]["id"];
                
                // 디버깅을 위한 큐 내용을 출력 시작
                this.log('[' + sid + '] <- ' + this.getIdString(r.all()) + ', ' + this.getIdString(tempQueue.all()));
                // 디버깅을 위한 큐 내용을 출력 끝

                var qsize = r.size();
                var loop = 0;
                while (sid != rid && r.size() > 0) {
                    this.log("*****************send :: " + sid);
                    this.log("*****************receive :: " + rid);
                    this.log("*****************equal? " + (sid == rid));

                    tempQueue.enqueue(send_data);
                    
                    // 디버깅을 위한 큐 내용을 출력 시작
                    this.log(this.getIdString(r.all()) + ', ' + this.getIdString(tempQueue.all()) + ' <- []');
                    // 디버깅을 위한 큐 내용을 출력 끝

                    send_data = r.dequeue();
                    sid = send_data["send"]["id"];
                    
                    // 디버깅을 위한 큐 내용을 출력 시작
                    this.log('[' + sid + '] <- ' + this.getIdString(r.all()) + ', ' + this.getIdString(tempQueue.all()));
                    // 디버깅을 위한 큐 내용을 출력 끝

                    this.log("*****************send :: " + sid);
                    this.log("*****************receive :: " + rid);
                    this.log("*****************next equal? " + (sid == rid));
                    loop++;
                    if (loop > qsize) {
                        logger.error('[FETAL]infinite loop! break!');
                        this.log("[FETAL]infinite loop! break!");
                        break;
                    }
                }

                qsize = tempQueue.size();
                loop = 0;
                while (tempQueue.size() > 0) {
                    var temp_data = tempQueue.dequeue();
                    var tid = temp_data["send"]["id"];
                    
                    // 디버깅을 위한 큐 내용을 출력 시작
                    this.log(this.getIdString(r.all()) + ', [' + tid + '] <- ' + this.getIdString(tempQueue.all()));
                    // 디버깅을 위한 큐 내용을 출력 끝
                    
                    r.enqueueReverse(temp_data);

                    // 디버깅을 위한 큐 내용을 출력 시작
                    this.log('[] -> ' + this.getIdString(r.all()) + ', ' + this.getIdString(tempQueue.all()));
                    // 디버깅을 위한 큐 내용을 출력 끝

                    loop++;
                    if (loop > qsize) {
                        logger.error('[FETAL]infinite loop! break!');
                        this.log("[FETAL]infinite loop! break!");
                        break;
                    }
                }
                
                // 디버깅을 위한 큐 내용을 출력 시작
                this.log(this.getIdString(r.all()) + ', ' + this.getIdString(tempQueue.all()));
                // 디버깅을 위한 큐 내용을 출력 끝

                logger.debug("**ROUTER EVENT RECV** :: " + recv + "SEND :: " + JSON.stringify(send_data.send));
                var data = {
                    "send" : send_data,
                    "recv" : recv_data
                }
                send_data.callback.resolve(data)

                this.log("----------------------------------------------------/")
            } catch (error) {
                try {
                    send_data.callback.reject(error)    
                } catch (err) {
                    console.log("panic :: " + err)
                }
            }
        });
        Timer();
    }
    //ADD 
    add(srv) {
        this._srv.push(srv);
        if(this._srv.length == 1 ){
            ipc = this._srv.pop();
        }
    }
    // CALL
    async call(obj){
        return new Promise((resolve, reject) => {
            setTimeout(()=> {
                obj.callback = {
                    resolve,
                    reject
                }
                q.enqueue(obj);
                
            }, 100)
        })
    }
    // IPC CONNECT
    async connect(path){
        var result = null;
        await client.Connect(path).then((resolve) => {
            result = resolve
            console.log("success")            
        }, (reject) => {
            console.log("fail")            
            result = reject
        });
        
        return result;
    }

    getIdString(arr) {
        if (!arr || arr.length == 0) {
            return '[]';
        }
        var ids = [];
        for (var i = 0; i < arr.length; i++) {
            ids.push(arr[i]["send"]["id"]);
        }
        return '[' + ids.join("][") + ']';
    }

    log(printStr) {
        if (this.doLog) {
            console.log(printStr);
            logger.debug(printStr);
        }
    }
}
module.exports = Router;