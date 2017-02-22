var User = require('../models/potentialUser.js');
var request = require('superagent');


exports.addPotentialUser = function(req, res) {
  var newUser = new User(req.body.user);

  console.log(req.body.user);

  User.findOne({ 'email': newUser.email }).exec(function(err, user, next) {
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
        next();
      });
    }
  });
}

exports.addToMailchimp = function(req, res) {
  var mailchimpApiKey = process.env.MAILCHIMP_API_KEY;
  var listUniqueId = process.env.INTERESTED_LIST_ID;

  request
    .post('https://us15.api.mailchimp.com/3.0/lists/' + listUniqueId + '/members/')
    .set('Content-Type', 'application/json;charset=utf-8')
    .set('Authorization', 'Basic ' + new Buffer('any:' + mailchimpApiKey ).toString('base64'))
    .send({
      'email_address': req.body.user.email,
      'status': 'subscribed'
    })
        .end(function(err, response) {
          if (response.status < 300 || (response.status === 400 && response.body.title === "Member Exists")) {
            res.send('Signed Up!');
          } else {
            res.send('Sign Up Failed :(');
          }
      });
}
