var Game = require('../models/game');
var User = require('../models/user');
var sanitizeHtml = require('sanitize-html');

exports.addGame = function(req, res, next) {
  var newGame = new Game(req.body.game);

  newGame.name = sanitizeHtml(newGame.name);
  newGame.description = sanitizeHtml(newGame.description);
  newGame.img = sanitizeHtml(newGame.img);
  newGame.backgroundImg = sanitizeHtml(newGame.backgroundImg);

  newGame.save((err, saved) => {
    if (err) { res.status(500).send(err); }

    res.json({ game: saved });

    req.game = saved;
    next();
  });
}

exports.addGameToDeveloper = function(req, res, next) {
  User.findByIdAndUpdate(req.game.developer,
    { $addToSet: { games: req.game._id } }, // Update
    { upsert: true }, // Options
    function(err, user) { // Callback
    if (err) { res.status(500).send(err); }
  });
}

exports.addGameToUser = function(req, res, next) {
  User.findByIdAndUpdate(req.body.userId,
    { $push: { downloadedGames: req.body.gameId } }, // Update
    { upsert: true }, // Options
    function(err, user) { // Callback
    if (err) { res.status(500).send(err); }

    res.json({ message: "User added!" });
  });
}

exports.getGames = function(req, res) {
  Game.find().sort('-createdAt').exec(function(err, games) {
    if (err) {
      res.send(err);
    }

    res.json(games);
  });
}

exports.getDeveloperGames = function(req, res) {
  User.findById(req.params.dev_id)
  .populate({
    path: 'games',
    model: 'Game',
    select: 'name _id feedbacks backgroundImg',
    populate: {
      path: 'feedbacks',
      model: 'Feedback',
      options: { sort: { 'createdAt': -1 } },
      populate: {
        path: 'gameplay sender',
        select: 'username _id cloudfrontURL'
      }
    }
  })
  .exec(function(err, dev) {
    if (err) { res.status(500).send(err); }

    res.json({ games: dev.games })
  });
}

exports.getUserGames = function(req, res) {
  User.findById(req.params.user_id)
  .populate({
    path: 'downloadedGames',
    model: 'Game',
    select: 'name _id img'
  })
  .exec(function(err, user) {
    if (err) { res.status(500).send(err); }

    res.json({ games: user.downloadedGames })
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

exports.updateAllowedUsers = function(req, res) {
  Game.findByIdAndUpdate(req.item,
    { $addToSet: { allowedPlayers: req.body.user } },
    function(err, game) {
      if (err) {
        res.send(err);
      }

      res.json({ validKey: true, itemType: req.itemType, game: game, user: req.body.user });
    })
}
