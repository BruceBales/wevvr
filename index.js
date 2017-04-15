var RTM = require("satori-sdk-js");
var process = require("./lib/process.js");
var r = require('rethinkdbdash')();

var endpoint = "wss://open-data.api.satori.com";
var appKey = "Dd609af98cDfCdae7C8A04c4Bb5eC3Ee";
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
