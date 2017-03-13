var User = require('../models/user.js');
var jwt = require('jsonwebtoken');

var jwt_secret = process.env.JWT_SECRET;

exports.signUp = function(req, res) {
  var newUser = new User(req.body.user);

  User.find({ $or:[ { email: newUser.email }, { username: newUser.username } ] }, 'username email', function(err, users) {
    if (users.length > 0) {
      if (users[0].email === newUser.email || users.length === 2) {
        res.send({ message: "Email already in use." })
      }
      else {
        res.send({ message: "Username is taken." })
      }
    }
    else {
      newUser.save(function(err, user) {
        if (err) return res.status(500).send(err);

        var token = jwt.sign({ _id: user._id, username: user.username, profilePic: user.profilePic, isDeveloper: user.isDeveloper }, jwt_secret);

        res.json({ jwt: token });
      });
    }
  })
}

exports.login = function(req, res) {
  User.findOne({ email: req.body.email }, function (err, user) {
    if (!user) {
      res.send({ message: "Email not found." })
    }
    else {
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (!isMatch) {
          return res.send({ message: 'Incorrect password, please try again.' });
        }
        var token = jwt.sign({ _id: user._id, username: user.username, profilePic: user.profilePic, isDeveloper: user.isDeveloper }, jwt_secret);
        res.send({ token: token});
      });
    }
  })
}
