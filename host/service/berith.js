var appManage = require('../brt/appManage')
var bigInt = require("big-integer");
var name = 'berith'
var ele = require('electron')

//var webview = null

class BerithService {
    constructor(app, web) {
        this._name = name;
        this._webview = web;
        this._app = app;
        
        if( this._app != null){
            this.initialize();
        }
    }

    initialize(){        
        this._app.on('getBlock', this.getBlock);
        this._app.on('coinbase', this.coinbase);
        this._app.on('accounts', this.accounts);
        this._app.on('getBalance', this.getBalance);
        this._app.on('stakeBalance', this.stakeBalance);
        this._app.on('rewardBalance', this.rewardBalance);
        this._app.on('sendTransaction', this.sendTransaction);
        this._app.on('sendTransaction2', this.sendTransaction2);
        this._app.on('stakeTransaction', this.stakeTransaction);
        this._app.on('rewardToBalance', this.rewardToBalance);
        this._app.on('rewardToStake', this.rewardToStake);
        this._app.on('stopStaking' , this.stopStaking)
        this._app.on('getPendingTransaction' , this.pendingTransactions ); 
        //this._app.on('syncing', this.syncing);
        this._app.on("dialog" , this.dialog);
        this._app.on("importFile" , this.importFile);
        
    }

    async dialog ( event , args) {
        var dir = ele.dialog.showOpenDialog({ properties: [ 'openDirectory'] } )
        console.log(" dir :::: "  +dir )
        event.returnValue = dir
    }
    async importFile ( event , args) {
        var dir = ele.dialog.showOpenDialog({ properties: [ 'openFile'] } )
        console.log(" dir :::: "  +dir )
        event.returnValue = dir
    }

    async pendingTransactions (event , args) {
        console.log("berith :: pendingTransactions");

        var obj = {
            service : 'berith', //service name           
            send : {        //send protocol
                jsonrpc : "2.0",
                method : "berith_pendingTransactions",
                params : [],
                id : "pendingTransactions call"
            }
        };
        event.returnValue = await Call(obj) ;
    }
    async stopStaking (event , args){
        console.log("berith :: stopStaking");

        var obj = {
            service : 'berith', //service name           
            send : {        //send protocol
                jsonrpc : "2.0",
                method : "berith_stopStaking",
                params : [{from :args}],
                id : "stopStaking call"
            }
        };
        event.returnValue = await Call(obj) ;
    }

    async syncing(event , args) {
        console.log("berith :: syncing");

        var obj = {
            service : 'berith', //service name           
            send : {        //send protocol
                jsonrpc : "2.0",
                method : "berith_syncing",
                params : [],
                id : "syncing call"
            }
        };
        event.returnValue = await Call(obj) ;
    }
    // 블록 정보
    async getBlock(event , args) {
        console.log("berith :: getBlock");

        var obj = {
            service : 'berith', //service name           
            send : {        //send protocol
                jsonrpc : "2.0",
                method : "berith_blockNumber",
                params : [],
                id : "blockNumber call"
            }
        };
        event.returnValue = await Call(obj) ;
    }
    // 코인베이스
    async coinbase(event , args) {
        console.log("berith :: coinbase");

        var obj = {
            service : 'berith', //service name           
            send : {        //send protocol
                jsonrpc : "2.0",
                method : "berith_coinbase",
                params : [],
                id : "coinbase call"
            }
        };
        event.returnValue = await Call(obj) ;
    }
    // 계정목록
    async accounts(event , args) {
        console.log("berith :: accounts");

        var obj = {
            service : 'berith', //service name           
            send : {        //send protocol
                jsonrpc : "2.0",
                method : "berith_accounts",
                params : [],
                id : "accounts call"
            }
        };
        event.returnValue = await Call(obj) ;
    }
    // 메인 잔고 
    async getBalance(event , args) {
        console.log("berith :: getBalance");

        var obj = {
            service : 'berith', //service name           
            send : {        //send protocol
                jsonrpc : "2.0",
                method : "berith_getBalance",
                params : [args , "latest"],
                id : "getBalance call"
            }
        };
       event.returnValue = await Call(obj) ;
    }
    // staking 잔고 
    async stakeBalance(event , args) {
        console.log("berith :: stakeBalance");

        var obj = {
            service : 'berith', //service name           
            send : {        //send protocol
                jsonrpc : "2.0",
                method : "berith_getStakeBalance",
                params : [args , "latest"],
                id : "stakeBalance call"
            }
        };
        event.returnValue = await Call(obj) ;
    }
     // reward 잔고 
     async rewardBalance(event , args) {
        console.log("berith :: rewardBalance");

        var obj = {
            service : 'berith', //service name           
            send : {        //send protocol
                jsonrpc : "2.0",
                method : "berith_getRewardBalance",
                params : [args , "latest"],
                id : "rewardBalance call"
            }
        };
        event.returnValue = await Call(obj) ;
    }
    // reward 잔고 
    async sendTransaction(event , args) {
        console.log("berith :: sendTransaction");

        var valueData = getTxValue(args.value).value
        var obj = {
            service : 'berith', //service name           
            send : {        //send protocol
                jsonrpc : "2.0",
                method : "berith_sendTransaction",
                params : [{from : args.from ,to: args.to , value : "0x"+valueData } ],
                id : "sendTransaction call"
            }
        };
        event.returnValue = await Call(obj) ;
    }
    async sendTransaction2(event , args) {
        console.log("berith :: sendTransaction");

        // var valueData = getTxValue(args.value).value
        var gasData = parseInt(args.gasPrice*2).toString(16)
        console.log( "gasData ::: " + gasData)
        var obj = {
            service : 'berith', //service name           
            send : {        //send protocol
                jsonrpc : "2.0",
                method : "berith_sendTransaction",
                params : [{from : args.from ,to: args.from , value : "0x0" , gas: "0x15F90" , gasPrice: "0x"+gasData , nonce : args.nonce} ],
                id : "sendTransaction call"
            }
        };
        event.returnValue = await Call(obj) ;
    }
    // stake Transaction
    async stakeTransaction(event , args) {
        console.log("berith :: stakeTransaction");
        var valueData = getTxValue(args.value).value
        
        var obj = {
            service : 'berith', //service name           
            send : {        //send protocol
                jsonrpc : "2.0",
                method : "berith_stake",
                params : [{from :args.from , value : "0x"+valueData} ],
                id : "stakeTransaction call"
            }
        };
        event.returnValue = await Call(obj) ;
    }
    // rewardToBalance
    async rewardToBalance(event , args) {
        console.log("berith :: rewardToBalance");

        var valueData = getTxValue(args.value).value
        var obj = {
            service : 'berith', //service name           
            send : {        //send protocol
                jsonrpc : "2.0",
                method : "berith_rewardToBalance",
                params : [{from :args.from , value : "0x"+valueData} ],
                id : "rewardToBalance call"
            }
        };
        event.returnValue = await Call(obj) ;
    }
    // rewardToSatke
    async rewardToStake(event , args) {
        console.log("berith :: rewardToStake");
        
        var valueData = getTxValue(args.value).value
        var obj = {
            service : 'berith', //service name           
            send : {        //send protocol
                jsonrpc : "2.0",
                method : "berith_rewardToStake",
                params : [{from :args.from , value : "0x"+valueData} ],
                id : "rewardToStake call"
            }
        };
        event.returnValue = await Call(obj) ;
    }
    
}

// call 메소드
async function Call(obj){
    var result = null;
    await appManage.getRouter().call(obj).then((resolve) => {
        result = resolve
    }, (reject) => {
        result = reject
    })

    console.log("result :::: "+JSON.stringify(result)+"\n");
    return result
}
function getTxValue(value){

    var rs = {
      result : false,
      value : "",
      error : "",
    }
  
    try{
        var u = Math.ceil(value)
        var f = Math.floor(value);
        var d = value % f;
        if( f == 0 && u > 0){
            d = 1 
        }
    
      var txValue = "";
    
      if(d > 0){
        var dot = value.toString().replace(f.toString() + ".", "");
    
        var len = dot.length;
    
        var temp = value.toString().replace(".", "");
        for(var i = 0; i< 18 - len; i++){
          temp += "0";
        }
        txValue = bigInt(temp).toString(16);
        
      } else {
        txValue = bigInt(f.toString() + "000000000000000000").toString(16);
    
      }
  
  
      
  
      rs.result = true;
      rs.value = txValue;
  
      return rs;
    }
    catch(err){
      rs.result = false;
      rs.error = err;
      return rs
    }
  }
module.exports = BerithService;