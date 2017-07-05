var RTM = require("satori-sdk-js");
var process = require("./lib/process.js");
var r = require('rethinkdbdash')();

var endpoint = "wss://open-data.api.satori.com";
var appKey = "dc8a2BFaA71e5aA64940DFed6fEb89de";
var channel = "NWS-All-USA-Alerts";


var rtm = new RTM(endpoint, appKey);
rtm.on("enter-connected", function() {
  console.log("Connected to RTM!");
});

var subscription = rtm.subscribe(channel, RTM.SubscriptionMode.SIMPLE);
subscription.on('rtm/subscription/data', function (pdu) {
  pdu.body.messages.forEach(function (msg) {
    r.table('Users').run().then(function(result) {
      var conf = result;
      for (var i in conf) {
        var al = process.Alert(conf[i], msg);
        process.Mail(al, conf[i].email, msg);
        console.log("Sent mail to" + conf[i].email);
      }
    });
  });
});



rtm.start();
