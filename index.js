var RTM = require("satori-sdk-js");
var process = require("./lib/process.js");



var endpoint = "wss://open-data.api.satori.com";
var appKey = "Dd609af98cDfCdae7C8A04c4Bb5eC3Ee";
var channel = "NWS-All-USA-Alerts";

//Will eventually be pulled from a database, to allow front-end web modification
var conf = {
  "email": "bruce.morgan.bales@gmail.com",
  "criteria": {
    "msgType": "Alert",
  }
}

var rtm = new RTM(endpoint, appKey);
rtm.on("enter-connected", function() {
  console.log("Connected to RTM!");
});

var subscription = rtm.subscribe(channel, RTM.SubscriptionMode.SIMPLE);
subscription.on('rtm/subscription/data', function (pdu) {
  pdu.body.messages.forEach(function (msg) {
    var al = process.Alert(conf, msg);
    process.Mail(al, conf.email, msg);
  });
});



rtm.start();
