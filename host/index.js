var berithapi = require('./brt/berithapi');
var Eth = require('./service/eth');

var express = require('express');
var app = express();

berithapi.addService(new Eth(app));


app.get("/connect", async (req, res) => {
  var rs = await berithapi.Connect('\\\\.\\pipe\\geth.ipc');
  res.send(rs);
})


app.listen(3000, function () {
});


