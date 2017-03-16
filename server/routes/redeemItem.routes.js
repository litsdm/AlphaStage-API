var express = require('express');
var router = express.Router();
var RedeemItemController = require('../controllers/redeemItem.controller.js');
var GameController = require('../controllers/game.controller.js');

// redeem item
router.route('/redeem').post(RedeemItemController.redeem, GameController.updateAllowedUsers);

module.exports = router;
