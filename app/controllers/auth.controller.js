var User = require('../models/user.js');
var jwt = require('jsonwebtoken');

exports.signUp = function(req, res) {
  var newUser = new User(req.body.user);

  newUser.save(function(err, user) {
    if (err) return res.status(500).send(err);

    var token = jwt.sign({ _id: user._id, tag: user.tag }, 'anniepamissecret290296');

    res.json({ jwt: token });
  });
}
