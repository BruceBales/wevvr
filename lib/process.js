
//Configure mail service
var sendmail = require('sendmail')();

exports.Alert = function(conf, object) {
  //Declaring main variables
  var string = JSON.stringify(object);

  var criteria = JSON.parse(JSON.stringify(conf.criteria));


  var objstring = "";
  //Inserts JSON keys/values into a new string
  for (var key in object) {
    if (object.hasOwnProperty(key)) {
      objstring += key + ": " + object[key] + "\n";
    }
  }

  function configstr(name) {
      for (var key in criteria) {
      if (criteria.hasOwnProperty(key)) {
        return name + ": " + criteria[name] + "\n";
      }
    }
  }

  //Returns matches using indexOf
  for (var key in criteria) {
    return(objstring.indexOf(configstr(key)));
  }
}

exports.Mail = function(alertval, email, albody) {

  if (alertval > -1) {
    sendmail({
        from: 'bruce@brucebales.org',
        to: email,
        subject: 'Alert! Weather warning: ' + albody.title,
        html: 'Alert:\n' + albody.summary,
      }, function(err, reply) {
        console.log(err && err.stack);
        console.dir(reply);
    });
  }
}
