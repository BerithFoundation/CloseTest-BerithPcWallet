var appManage = require('../brt/appManage');
var name = 'txpool'

class TxPoolService {
    constructor(app , web) {
        this._name = name;
        this._app = app;
        this._webview = web;

        if( this._app != null){
            this.initialize();
        }
    }
    initialize(){       
        this._app.on('txpool' , this.txpool)
    }

    // txpool 조회
    async txpool(event , args) {
        console.log("txpool :: txpool");
        var obj = {
            service : 'txpool', //service name           
            send : {        //send protocol
                jsonrpc : "2.0",
                method : "txpool_content",
                params : [],
                id : "txpool call"
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
module.exports = TxPoolService;