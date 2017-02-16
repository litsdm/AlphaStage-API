var express = require('express');
var router = express.Router();
var GameplayController = require('../controllers/gameplay.controller.js');

// Add gameplay
router.route('/gameplays').post(GameplayController.addGameplay);

// Get all gameplays
router.route('/gameplays').get(GameplayController.getGameplays);

// Get a single gameplay
router.route('/gameplays/:gameplay_id').get(GameplayController.getGameplay);

// Delete game
router.route('/gameplays/:gameplay_id').delete(GameplayController.deleteGameplay);

module.exports = router;
