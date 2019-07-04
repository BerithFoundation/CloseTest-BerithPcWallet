var appManage = require('../brt/appManage');

var name = 'personal'

class PersonalService {
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
       this._app.on('newAccount' , this.newAccount)
       this._app.on('listWallets' ,this.listWallets)
       this._app.on('unlockAccount' ,this.unlockAccount)
       this._app.on('lockAccount' ,this.lockAccount)
    }

    // 새로운 계정 생성
    async newAccount(event , args) {
        console.log("personal :: newAccount");

        var obj = {
            service : 'personal', //service name           
            send : {        //send protocol
                jsonrpc : "2.0",
                method : "personal_newAccount",
                params : [args ],
                id : "newAccount call"
            }
        };
        event.returnValue = await Call(obj) ;
    }
    // 계정 잠금 상태가 포함된 월렛 리스트
    async listWallets(event , args) {
        console.log("personal :: listWallets");

        var obj = {
            service : 'personal', //service name           
            send : {        //send protocol
                jsonrpc : "2.0",
                method : "personal_listWallets",
                params : [args.add , args.pass , 0 ],
                id : "listWallets call"
            }
        };
        event.returnValue = await Call(obj) ;
    }
    // 계정 잠금 해제
    async unlockAccount(event , args) {
        console.log("personal :: unlockAccount");

        var obj = {
            service : 'personal', //service name           
            send : {        //send protocol
                jsonrpc : "2.0",
                method : "personal_unlockAccount",
                params : [args.add , args.pass , 0 ],
                id : "unlockAccount call"
            }
        };
        event.returnValue = await Call(obj) ;
    }
    // 계정 잠금
    async lockAccount(event , args) {
        console.log("personal :: lockAccount");

        var obj = {
            service : 'personal', //service name           
            send : {        //send protocol
                jsonrpc : "2.0",
                method : "personal_lockAccount",
                params : [args.add],
                id : "lockAccount call"
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
module.exports = PersonalService;