var appManage = require('../brt/appManage');
var name = 'miner'

class MinerService {
    constructor(app, web) {
        this._name = name;
        this._app = app;
        this._webview = web;

        //Add Event
        if(this._app != null) {
            this.initialize();
        }
    }

    initialize(){       
       this._app.on('setBerithbase' , this.setBerithbase)
       this._app.on('miningStart' , this.miningStart)
       this._app.on('miningStop' , this.miningStop)
    }
    // 새로운 계정 생성
    async setBerithbase(event , args) {
        console.log("miner :: setBerithbase");
        var obj = {
            service : 'miner', //service name           
            send : {        //send protocol
                jsonrpc : "2.0",
                method : "miner_setBerithbase",
                params : [args ],
                id : "setBerithbase call"
            }
        };
        event.returnValue = await Call(obj) ;
    }

    async miningStart( event , args){
        console.log("miner :: start");
        var obj = {
            service : 'miner', //service name           
            send : {        //send protocol
                jsonrpc : "2.0",
                method : "miner_start",
                params : [],
                id : "minerStart call"
            }
        };
        event.returnValue = await Call(obj) ;
    }

    async miningStop( event , args){
        console.log("miner :: stop");
        var obj = {
            service : 'miner', //service name           
            send : {        //send protocol
                jsonrpc : "2.0",
                method : "miner_stop",
                params : [],
                id : "miningStop call"
            }
        };
        event.returnValue = await Call(obj) ;
    }
}

async function Call(obj){
    var result = null;
    await appManage.getRouter().call(obj).then((resolve) => {
        result = resolve
    }, (reject) => {
        result = reject
    })

    console.log("result :::: "+JSON.stringify(result));
    return result
}
module.exports = MinerService;