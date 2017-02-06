var Feedback = require('../models/feedback');
var sanitizeHtml = require('sanitize-html');

exports.addFeedback = function(req, res) {
  var newFeedback = new Feedback(req.body.feedback);

  newFeedback.good = sanitizeHtml(newFeedback.good);
  newFeedback.better = sanitizeHtml(newFeedback.better);
  newFeedback.best = sanitizeHtml(newFeedback.best);

  newFeedback.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ feedback: saved });
  });
}

exports.getFeedbacks = function(req, res) {
  Feedback.find()
  .populate({
    path: 'game',
    select: 'name img playCount _id'
  })
  .populate('gameplay')
  .exec(function(err, feedbacks) {
    if (err) {
      res.send(err);
    }

    res.json(feedbacks);
  });
}

exports.getFeedback = function(req, res) {
  Feedback.findById(req.params.feedback_id, function(err, feedback) {
    if (err) {
      res.send(err);
    }

    res.json(feedback);
  });
}

exports.editFeedback = function(req, res) {
  Feedback.findById(req.params.feedback_id, function(err, feedback) {

    if (err) {
      res.send(err);
    }

    var newFeedback = new Feedback(req.body.feedback);

    var good = sanitizeHtml(newFeedback.good);
    var better = sanitizeHtml(newFeedback.better);
    var best = sanitizeHtml(newFeedback.best);

    if (good && good != "undefined") {
      feedback.good = good
    }
    if (better && better != "undefined") {
      feedback.better = better
    }
    if (best && best != "undefined") {
      feedback.best = best
    }

    feedback.save(function(err) {
      if (err) {
        res.send(err);
      }

      res.json({ message: 'feedback updated!' });
    });
  });
}

exports.deleteFeedback = function(req, res) {
  Feedback.remove({
    _id: req.params.feedback_id
  }, function(err, feedback) {
    if (err) {
      res.send(err);
    }

    res.json({ message: 'Successfully deleted' });
  });
}
