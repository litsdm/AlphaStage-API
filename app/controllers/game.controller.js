var Game = require('../models/game');

exports.addGame = function(req, res) {
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
}

exports.getGames = function(req, res) {
  Game.find(function(err, games) {
    if (err) {
      res.send(err);
    }

    res.json(games);
  });
}

exports.getGame = function(req, res) {
  Game.findById(req.params.game_id, function(err, game) {
    if (err) {
      res.send(err);
    }

    res.json(game);
  });
}

exports.editGame = function(req, res) {
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
}

exports.deleteGame = function(req, res) {
  Game.remove({
    _id: req.params.game_id
  }, function(err, game) {
    if (err) {
      res.send(err);
    }

    res.json({ message: 'Successfully deleted' });
  });
}
