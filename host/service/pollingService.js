
var bigInt = require("big-integer");
var hexToDec = require('hex-to-dec');
var appManage
var _database
var _webview
var peerYn
var syncYn
var blockNum
var blockInfomation
var transactionsYn
var from 
var to 
var value 
var base
var target
var hash
var Raccounts
var peerYn2 = false
var ppsyncYn = false
var accounts = []
var currentBlock
var highestBlock
var currentBlock2
var highestBlock2
var syncingPercent

class PollingService {
    constructor(router ,database, web){
        appManage = router
        _database = database    
        _webview = web
    }
    // 피어 연결 여부 조회
    async peerExistProtocol(){
        var protocol = {
            service : 'admin',
            send : {
                jsonrpc : "2.0" ,
                method : "admin_peers",
                params : [] ,
                id : "peer call"
            }
        }
        return await Call(protocol) 
    }
    // 동기화 조회
    async syncingProtocol(){
        var protocol = {
            service : 'berith',
            send : {
                jsonrpc : "2.0" ,
                method : "berith_syncing",
                params : [] ,
                id : "syncing call"
            }
        }
        return await Call(protocol) 
    }
    // 최신 블록 조회
    async blockNumberProtocol(){
        var protocol = {
            service : 'berith',
            send : {
                jsonrpc : "2.0" ,
                method : "berith_blockNumber",
                params : [] ,
                id : "blockNumber call"
            }
        }
    return await Call(protocol) 
    }
    // 블록 정보 조회
    async getBlockByNumberProtocol(data){
        var protocol = {
            service : 'berith',
            send : {
                jsonrpc : "2.0" ,
                method : "berith_getBlockByNumber",
                params : [data ,true] ,
                id : "getBlockByNumber call"
            }
        }
        return await Call(protocol) 
    }

    async getAccounts(){
        var protocol = {
            service : 'berith',
            send : {
                jsonrpc : "2.0" ,
                method : "berith_accounts",
                params : [] ,
                id : "getAccounts call"
            }
        }
        return await Call(protocol) 
    }

    //polling start 
    start(){
        setInterval(async () => {
            var peer =await this.peerExistProtocol()
            accounts = await this.getAccounts()
            Raccounts = accounts.recv.result
            peerYn = peer.recv.result
            sendPollingOut('peers', peerYn.length);
            this.peerResult(peerYn);
        },1000)
    }
    // 피어 여부 조회
    async peerResult(RpeerYn){
        if(RpeerYn != null && RpeerYn != ""){
            peerYn2 = true;
            var sync = await this.syncingProtocol()
            syncYn = sync.recv.result
            this.syncResult(syncYn);
        }
    }
    // 동기화 여부 조회
    async syncResult(RsyncYn){
        if( RsyncYn == false) {            
            if( currentBlock == null || currentBlock == ""){
                var block = await this.blockNumberProtocol()
                blockNum = block.recv.result
                if (parseInt(blockNum, 16) == 0){
                    return;
                }
                currentBlock = parseInt(blockNum, 16)
            }
            console.log( "current Block ::: " + currentBlock)
            syncingPercent = 100
            this.blockNumResult("0x"+currentBlock.toString(16))
            sendPollingOut('syncing', syncingPercent);
        }else{
            if( syncingPercent == 100 && peerYn2 == true ) {
                return;
            }
            currentBlock = parseInt(RsyncYn.currentBlock, 16)
            highestBlock = parseInt(RsyncYn.highestBlock , 16)
            syncingPercent = parseInt((currentBlock / highestBlock) * 100)
            sendPollingOut('syncing', syncingPercent);
            console.log("currentBlock :: " + currentBlock + "** highestBlock :: " +highestBlock)
        }
    }
    // 최신 블럭 정보 가져오는 함수
    async blockNumResult(RblockNum){
        // _webview.webContents.send('pending');
        if( RblockNum != null && RblockNum != ""){
            var blockInfo = await this.getBlockByNumberProtocol(RblockNum)
            blockInfomation = blockInfo.recv.result
            if (blockInfomation == null ){
                return ;
            }else{
                currentBlock++;
                transactionsYn = blockInfomation.transactions
                this.transactionsResult(transactionsYn)
            }
        }
    }
    // 실제 트랜잭션 정보 가져오는 함수
    async transactionsResult(RtransactionsYn){
        if(RtransactionsYn != null && RtransactionsYn != "" ){
            var insertCnt = 0;
            RtransactionsYn.forEach((v) => {
                Raccounts.some((i) => {
                    if( i == v.from || i == v.to){
                        from = v.from
                        to   = v.to 
                        value = HexToValueString(v.value)
                        base  = v.base
                        target = v.target    
                        hash   = v.hash
                        if( i != v.from && i == v.to && target == 1 && base == 1 ){
                            _database.addTransaction(from , to , value, base , target, hash, "y")
                        }else{
                            _database.addTransaction(from , to , value, base , target, hash , "n")
                        }
                        insertCnt++;
                        //break;
                        return ( i == v.from || i == v.to)
                    }
                })
            });

            if (insertCnt > 0) {
                sendPollingOut('newTransactionOut', insertCnt);
            }
        }
    }
}

async function Call(obj){
    var result = null;
    await appManage.call(obj).then((resolve) => {
        result = resolve
    }, (reject) => {
        result = reject
    })
    return result
}

function pad(n, width) {
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
}

function HexToValueString(hex){
    var t = hexToDec(hex);

    var big = bigInt(t.toString());

    var t2 = big.divide("1e18"); //0
    var m = big.mod("1e18"); //127

    return t2 + "." + pad(m.toString(), 18);
}

async function sendPollingOut(type, data) {
    if (type == 'peers') { // out
        _webview.webContents.send('peersOut', data);
    } else if (type == 'syncing') { // err
        _webview.webContents.send('syncingOut', data);
    } else if (type == 'newTransactionOut') {
        _webview.webContents.send('newTransactionOut', data);
    }
}

/*************블록정보 조회 end **************/
module.exports = PollingService;
