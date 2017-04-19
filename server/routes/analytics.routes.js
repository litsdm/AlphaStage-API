var express = require('express');
var router = express.Router();
var AnalyticsController = require('../controllers/analytics.controller.js');

// Add Event
router.route('/analyticsEvent').post(AnalyticsController.addEvent);

module.exports = router;
