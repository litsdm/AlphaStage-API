var express = require('express');
var router = express.Router();
var PotentialUserController = require('../controllers/potentialUser.controller.js');

// Add user
router.route('/register').post(PotentialUserController.addPotentialUser, PotentialUserController.addToMailchimp);

module.exports = router;
