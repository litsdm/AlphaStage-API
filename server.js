// call the packages we need
var express = require('express');        // call express
var app = express();                     // define our app using express
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Game = require('./app/models/game');

mongoose.connect('mongodb://cdiezm:telefono1@ds159737.mlab.com:59737/playgrounds')
mongoose.Promise = global.Promise

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 3000;        // set our port

var router = express.Router();              // get an instance of the express Router

router.get('/', function(req, res) {
  res.json({ message: 'hooray! welcome to our api!' });
});

router.route('/games').post(function(req, res) {
  var game = new Game();

  game.name = req.body.name;
  game.description = req.body.description;
  game.img = req.body.img;

  game.save(function(err) {
    if (err) {
      res.send(err);
    }

    res.json({ message: 'Game created!' });
  });

}).get(function(req, res) {
  Game.find(function(err, games) {
    if (err) {
      res.send(err);
    }

    res.json(games);
  });
});

router.route('/games/:game_id').get(function(req, res) {
  Game.findById(req.params.game_id, function(err, game) {
    if (err) {
      res.send(err);
    }

    res.json(game);
  });
}).put(function(req, res) {
  Game.findById(req.params.game_id, function(err, game) {

    if (err) {
      res.send(err);
    }

    game.name = req.body.name;
    game.description = req.body.description;
    game.img = req.body.img;

    Game.save(function(err) {
      if (err) {
        res.send(err);
      }

      res.json({ message: 'game updated!' });
    });
  });
}).delete(function(req, res) {
  Game.remove({
    _id: req.params.game_id
  }, function(err, game) {
    if (err) {
      res.send(err);
    }

    res.json({ message: 'Successfully deleted' });
  });
});

app.use('/api', router);

app.listen(port);
console.log('Magic happens on port ' + port);
