var router = null;
var client = null;

module.exports = {
    addRouter(rt){
        router = rt;
    },
    getRouter(){
        return router;
    },
    addClient(c){
        client = c;
    },
    getClient(){
        return client;
    },
}