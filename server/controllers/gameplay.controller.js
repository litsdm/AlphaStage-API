var Gameplay = require('../models/gameplay');

exports.addGameplay = function(req, res) {
  var newGameplay = new Gameplay(req.body.gameplay);

  newGameplay.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ gameplay: saved });
  });
}

exports.getGameplays = function(req, res) {
  Gameplay.find(function(err, gameplays) {
    if (err) {
      res.send(err);
    }

    res.json(gameplays);
  });
}

exports.getGameplay = function(req, res) {
  Gameplay.findById(req.params.gameplay_id, function(err, gameplay) {
    if (err) {
      res.send(err);
    }

    res.json(gameplay);
  });
}

exports.deleteGameplay = function(req, res) {
  Gameplay.remove({
    _id: req.params.gameplay_id
  }, function(err, gameplay) {
    if (err) {
      res.send(err);
    }

    res.json({ message: 'Successfully deleted' });
  });
}
