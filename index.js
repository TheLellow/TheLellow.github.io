 // server.js
var express = require('express');
var expressLayouts = require('express-ejs-layouts');
var app = express();
var port = 8000;

app.use(function(req, res, next) {
 res.header("Access-Control-Allow-Origin", "*");
 res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
 next();
});

//use ejs and express layouts
app.set('view engine', 'ejs');
app.use(expressLayouts);

// route our app
var router = require('./app/routes');
app.use('/', router);

// set static files(css and images) location
app.use(express.static('public'));

// start the server
app.listen(port, function() {
  console.log('app started');
});