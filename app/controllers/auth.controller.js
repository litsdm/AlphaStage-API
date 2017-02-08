var User = require('../models/user.js');
var jwt = require('jsonwebtoken');

var jwt_secret = process.env.JWT_SECRET || 'anniepamissecret290296';

exports.signUp = function(req, res) {
  var newUser = new User(req.body.user);

  newUser.save(function(err, user) {
    if (err) return res.status(500).send(err);

    var token = jwt.sign({ _id: user._id, tag: user.tag }, jwt_secret);

    res.json({ jwt: token });
  });
}
