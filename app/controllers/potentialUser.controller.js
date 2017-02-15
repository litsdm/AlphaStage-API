var User = require('../models/potentialUser.js');

exports.addPotentialUser = function(req, res) {
  var newUser = new User(req.body.user);

  User.findOne({ 'email': newUser.email }).exec(function(err, user) {
    if (err) {
      console.log(err);
      res.send(err);
    }
  });
}
