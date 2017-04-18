var express = require('express');
var router = express.Router();
var AnalyticsEventController = require('../controllers/analytics.controller.js');

// Add Event
router.route('/analyticsEvent').post(AnalyticsEventController.addEvent);

module.exports = router;
