var RedeemItem = require('../models/redeemItem.js');
var shortid = require('shortid');

exports.addRedeemItem = function (req, res, next, app) {
  var newRedeemItem = new RedeemItem(req.body.redeemItem);

  newRedeemItem.key = shortid.generate();

  newRedeemItem.save(function(err, redeemItem) {
    if (err) { res.status(500).send(err); }

    app.mailer.send('privateInvite', {
        to: req.body.email,
        subject: 'You have been invited to play ' + req.body.game + '!',
        game: req.body.game,
        key: redeemItem.key
      }, function (err) {
        if (err) {
          // handle error
          res.send('There was an error sending the email');
          return;
        }
      });

    res.json({ redeemItem: redeemItem });
  });
}

exports.redeem = function (req, res, next) {
  var user = req.body.user;
  var key = req.body.key;

  RedeemItem.findOneAndRemove({ key: key }, function(err, redeemItem) {
    if (err) { res.status(500).send(err); }

    if (!redeemItem) {
      res.json({ validKey: false, message: "The key you entered does not exist." })
    }
    else {
      next();
    }
  });
}
