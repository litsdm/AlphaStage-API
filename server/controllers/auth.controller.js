var User = require('../models/user.js');
var jwt = require('jsonwebtoken');

var jwt_secret = process.env.JWT_SECRET || 'anniepamissecret290296';

exports.signUp = function(req, res) {
  var newUser = new User(req.body.user);

  newUser.save(function(err, user) {
    if (err) return res.status(500).send(err);

    var token = jwt.sign({ _id: user._id, username: user.username, profilePic: user.profilePic }, jwt_secret);

    res.json({ jwt: token });
  });
}

exports.login = function(req, res) {
  User.findOne({ email: req.body.email }, function (err, user) {
    user.comparePassword(req.body.password, function (err, isMatch) {
      if (!isMatch) {
        return res.status(401).send({ message: 'Wrong email or password' });
      }
      var token = jwt.sign({ _id: user._id, username: user.username, profilePic: user.profilePic }, jwt_secret);
      res.send({ token: token});
    });
  })
}
