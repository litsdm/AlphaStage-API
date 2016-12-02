// call the packages we need
var express = require('express');        // call express
var app = express();                     // define our app using express
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var games = require('./app/routes/game.routes.js');

mongoose.connect('mongodb://cdiezm:telefono1@ds159737.mlab.com:59737/playgrounds')
mongoose.Promise = global.Promise

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 3000;        // set our port

app.use('/api', games);

app.listen(port);
console.log('Magic happens on port ' + port);
