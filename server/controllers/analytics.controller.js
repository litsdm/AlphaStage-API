var Analytics = require('../models/analytics');
var AnalyticsEvent = require('../models/analyticsEvent');
var _ = require('lodash');

exports.createEmpty = function(req, res, next) {
  var analytics = new Analytics();
  analytics.save(function(err, saved) {
    if (err) { res.status(500).send(err); }

    req.analytics = saved._id
    next();
  });
}

exports.triggerDefaultEvent = function(req, res, next) {
  var name = req.body.name;
  var analyticsID = req.body.analyticsID;
  var user = req.body.user

  Analytics.findById(analyticsID, function(err, analytics) {
    if (err) {
      res.send(err);
      return
    }
    else if (!analytics) {
      res.sendStatus(400);
      return
    }
    if (name == "pageView") {
      analytics.pageViews += 1
      // Check all lists for user
      var downloadIndex = _.findIndex(analytics.downloadUsers, function(elem) { return elem == user; });
      var playingIndex = _.findIndex(analytics.playingUsers, function(elem) { return elem == user; });
      var uninstallIndex = _.findIndex(analytics.uninstallUsers, function(elem) { return elem == user; });
      var pageViewsIndex = _.findIndex(analytics.pageViewUsers, function(elem) { return elem == user; });

      if (downloadIndex == -1 && playingIndex == -1 && uninstallIndex == -1 && pageViewsIndex == -1) {
        analytics.pageViewUsers.push(user);
      }
    }
    else if (name == "download") {
      analytics.downloads += 1
      // if user is not in download or playing check the rest of the lists and append
      var downloadIndex = _.findIndex(analytics.downloadUsers, function(elem) { return elem == user; });
      var playingIndex = _.findIndex(analytics.playingUsers, function(elem) { return elem == user; });

      if (downloadIndex == -1 || playingIndex == -1) {
        // if user is in page views remove and add to download
        var pageViewsIndex = _.findIndex(analytics.pageViewUsers, function(elem) { return elem == user; });
        if (pageViewsIndex != -1) {
          analytics.pageViewUsers.splice(pageViewsIndex, 1);
        }
        // if user is in uninstall remove and add to download
        var uninstallIndex = _.findIndex(analytics.uninstallUsers, function(elem) { return elem == user; });
        if (uninstallIndex != -1) {
          analytics.uninstallUsers.splice(uninstallIndex, 1);
        }

        analytics.downloadUsers.push(user);
      }
    }
    else if (name == "play") {
      analytics.sessions += 1;
      // check if user is not already in playing
      var playingIndex = _.findIndex(analytics.playingUsers, function(elem) { return elem == user; });
      if (playingIndex == -1) {
        // if user is in pageView switch
        var pageViewsIndex = _.findIndex(analytics.pageViewUsers, function(elem) { return elem == user; });
        if (pageViewsIndex != -1) {
          analytics.pageViewUsers.splice(pageViewsIndex, 1);
        }

        var downloadIndex = _.findIndex(analytics.downloadUsers, function(elem) { return elem == user; });
        if (downloadIndex != -1) {
          analytics.downloadUsers.splice(downloadIndex, 1);
        }

        analytics.playingUsers.push(user);
        analytics.players += 1;
      }
    }
    else if (name == "uninstall") {
      // check if user is in download and switch
      var downloadIndex = _.findIndex(analytics.downloadUsers, function(elem) { return elem == user; });
      if (downloadIndex != -1) {
        analytics.downloadUsers.splice(downloadIndex, 1);
      }

      // check if user is in playing and switch
      var playingIndex = _.findIndex(analytics.playingUsers, function(elem) { return elem == user; });
      if (playingIndex != -1) {
        analytics.playingUsers.splice(playingIndex, 1);
      }

      analytics.uninstallUsers.push(user);
    }
    analytics.save(function(err) {
      if (err) {
        res.send(err);
      }

      res.sendStatus(200);
    });
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
