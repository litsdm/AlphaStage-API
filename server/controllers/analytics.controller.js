var Analytics = require('../models/analytics');
var AnalyticsEvent = require('../models/analyticsEvent');

exports.createEmpty = function(req, res, next) {
  var analytics = new Analytics();
  analytics.save(function(err, saved) {
    if (err) { res.status(500).send(err); }
    
    req.analytics = saved._id
    next();
  });
}

exports.addEvent = function(req, res, next) {
  var newEvent = new AnalyticsEvent();

  newEvent.name = req.body.eventName;
  newEvent.value = req.body.eventValue;

  newEvent.save((err, saved) => {
    if (err) { res.status(500).send(err); }

    res.json({ event: saved });
  });
}
