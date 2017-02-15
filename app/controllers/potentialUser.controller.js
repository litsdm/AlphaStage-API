var User = require('../models/potentialUser.js');

exports.addPotentialUser = function(req, res) {
  var newUser = new User(req.body.user);

  User.findOne({ 'email': newUser.email }).exec(function(err, user) {
    if (err) {
      res.send(err);
    }

    if (user) {
      res.json({ message: "Email already in use." });
    }
    else {
      newUser.save(function(err, user) {
        if (err) {
          res.send(err);
        }

        res.json({ message: "Thank you for signing up!" })
      });
    }
  });
}
