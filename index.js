// index.js
// where your node app starts

// init project
require('dotenv').config();
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint...
app.get('/api/whoami', function (req, res) {

  // for getting and storing our values
  // you can get these values from the HTTP request object (req)
  
  let ipaddress = req.header('x-forwarded-for');
  // you can also use
  // let ipaddress = req.socket.remoteAddress;
  // or
  // let ipaddress = req.ip;
  // if you want to get the more IP address info (assuming the client request came from a proxy server and was forwarded):
  // let ipaddress = req.header('x-forwarded-for');
  let language = req.header('Accept-Language');
  let software = req.header('User-Agent');
  
  res.json({ 
    ipaddress: ipaddress,
    language: language,
    software: software
  });
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
