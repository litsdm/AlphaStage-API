var Game = require('../models/game');
var sanitizeHtml = require('sanitize-html');

exports.addGame = function(req, res) {
  var newGame = new Game(req.body.game);

  newGame.name = sanitizeHtml(newGame.name);
  newGame.description = sanitizeHtml(newGame.description);
  newGame.img = sanitizeHtml(newGame.img);
  newGame.backgroundImg = sanitizeHtml(newGame.backgroundImg);

  newGame.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ game: saved });
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

    var newGame = new Game(req.body.game);

    game.name = sanitizeHtml(newGame.name);
    game.description = sanitizeHtml(newGame.description);
    game.img = sanitizeHtml(newGame.img);
    game.backgroundImg = sanitizeHtml(newGame.backgroundImg);

    game.galleryLinks = newGame.galleryLinks
    game.videoLinks = newGame.videoLinks

    game.save(function(err) {
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
