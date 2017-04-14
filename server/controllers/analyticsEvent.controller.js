var AnalyticsEvent = require('../models/analyticsEvent');

exports.addEvent = function(req, res, next) {
  var newEvent = new AnalyticsEvent();

  newEvent.name = req.body.eventName;
  newEvent.value = req.body.eventValue;

  newEvent.save((err, saved) => {
    if (err) { res.status(500).send(err); }

    res.json({ event: saved });
  });
}
