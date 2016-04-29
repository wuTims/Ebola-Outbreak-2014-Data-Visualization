//server.js

//set up ============
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var ejs = require('ejs');
var page = require('./controllers/pageData');

//configuration ===========

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json

app.set('view engine', 'ejs');

app.listen(8080);
console.log("App listening on port 8080");


app.get('/', page.loadHome);
app.get('/numbers', page.loadNumbers);
app.get('/visuals', page.loadVisuals);