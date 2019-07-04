var Router = require('../brt/routes/router');
var appManage = require('../brt/appManage');

var router = new Router();
appManage.addRouter(router);

function addService(srv){
    if(router == null) {
        return;
    }
    router.add(srv);
}

async function Connect(path) {
    var rs = await router.connect(path);    
    return rs;
}
module.exports = {
    Connect,
    addService,
    router
}