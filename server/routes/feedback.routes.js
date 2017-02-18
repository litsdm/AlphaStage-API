var express = require('express');
var router = express.Router();
var FeedbackController = require('../controllers/feedback.controller.js');

// Add feedback
router.route('/feedbacks').post(FeedbackController.addFeedback, FeedbackController.addFeedbackToGame);

// Get all feedbacks
router.route('/feedbacks').get(FeedbackController.getFeedbacks);

// Get a single feedback
router.route('/feedbacks/:feedback_id').get(FeedbackController.getFeedback);

// Edit feedback
router.route('/feedbacks/:feedback_id').put(FeedbackController.editFeedback);

// Delete feedback
router.route('/feedbacks/:feedback_id').delete(FeedbackController.deleteFeedback);

module.exports = router;
