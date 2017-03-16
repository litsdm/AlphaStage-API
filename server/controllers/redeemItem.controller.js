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
          console.log(err);
          res.send('There was an error sending the email');
          return;
        }
      });

    res.json({ redeemItem: redeemItem });
  });
}
