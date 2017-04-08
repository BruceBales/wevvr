var conf = {
  "email": "bruce.morgan.bales@gmail.com",
  "criteria": {
    "areaDesc":"Idaho",
    "msgType": "Alert"
  }
}

var object = { id: 'https://alerts.weather.gov/cap/wwacapget.php?x=TX125849F4C564.RedFlagWarning.12584A108A60TX.EPZRFWEPZ.724491aef18dc7a9e015e07d23dd14a0',
  updated: '2017-04-07T15:01:00-05:00',
  published: '2017-04-07T15:01:00-05:00',
  author: { name: 'w-nws.webmaster@noaa.gov' },
  title: 'Red Flag Warning issued April 07 at 3:01PM CDT until April 08 at 9:00PM CDT by NWS',
  link: 'https://alerts.weather.gov/cap/wwacapget.php?x=TX125849F4C564.RedFlagWarning.12584A108A60TX.EPZRFWEPZ.724491aef18dc7a9e015e07d23dd14a0',
  summary: '...CRITICAL FIRE CONDITIONS RETURNING SATURDAY... .Southwest flow will start to increase across the region on Saturday ahead of an approaching trough. Winds will increase to 20 to 25 mph during the afternoon. These southwest winds will combine with very dry low level air to create critical fire weather conditions.',
  event: 'Red Flag Warning',
  effective: '2017-04-07T15:01:00-05:00',
  expires: '2017-04-08T21:00:00-05:00',
  status: 'Actual',
  msgType: 'Alert',
  category: 'Met',
  urgency: 'Expected',
  severity: 'Severe',
  certainty: 'Likely',
  areaDesc: 'Idaho',
  polygon: '',
  geocode: { valueName: [ 'FIPS6', 'UGC' ], value: [ '048141', 'TXZ055' ] },
  parameter:
   { valueName: 'VTEC',
     value: '/O.CON.KEPZ.FW.W.0011.170408T1900Z-170409T0200Z/' } };



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
  console.log(objstring.indexOf(configstr(key)));
}
