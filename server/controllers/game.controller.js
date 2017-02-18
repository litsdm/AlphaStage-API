var Game = require('../models/game');
var User = require('../models/user');
var sanitizeHtml = require('sanitize-html');

exports.addGame = function(req, res) {
  var newGame = new Game(req.body.game);

  newGame.name = sanitizeHtml(newGame.name);
  newGame.description = sanitizeHtml(newGame.description);
  newGame.img = sanitizeHtml(newGame.img);
  newGame.backgroundImg = sanitizeHtml(newGame.backgroundImg);

  newGame.save((err, saved) => {
    if (err) { res.status(500).send(err); }

    // Add game to user games
    User.findByIdAndUpdate(newGame.developer,
      { $push: { games: saved } }, // Update
      { safe: true, upsert: true }, // Options
      function(err, user) { // Callback
      if (err) { res.status(500).send(err); }

      res.json({ game: saved });
    });
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

    var name = sanitizeHtml(newGame.name);
    var description = sanitizeHtml(newGame.description);
    var img = sanitizeHtml(newGame.img);
    var backgroundImg = sanitizeHtml(newGame.backgroundImg);

    if (name && name != "undefined") {
      game.name = name
    }
    if (description && description != "undefined") {
      game.description = description
    }
    if (img && img != "undefined") {
      game.img = img;
    }
    if (backgroundImg && backgroundImg != "undefined") {
      game.backgroundImg = backgroundImg
    }
    if (newGame.galleryLinks && newGame.galleryLinks[0] != null) {
      game.galleryLinks = newGame.galleryLinks
    }
    if (newGame.videoLinks && newGame.videoLinks[0] != null) {
      game.videoLinks = newGame.videoLinks
    }
    if (newGame.availableOn.windows) {
      game.availableOn.windows = newGame.availableOn.windows
    }
    if (newGame.availableOn.macOS) {
      game.availableOn.macOS = newGame.availableOn.macOS
    }
    if (newGame.availableOn.linux) {
      game.availableOn.linux = newGame.availableOn.linux
    }

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
