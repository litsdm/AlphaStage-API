var express = require('express');
var router = express.Router();
var GameController = require('../controllers/game.controller.js');
var AnalyticsController = require('../controllers/analytics.controller.js')

// Add game
router.route('/games').post(AnalyticsController.createEmpty, GameController.addGame, GameController.addGameToDeveloper);

// Get all games
router.route('/games').get(GameController.getGames);

// Get a single game
router.route('/games/:game_id').get(GameController.getGame);

// Edit game
router.route('/games/:game_id').put(GameController.editGame);

// Delete game
router.route('/games/:game_id').delete(GameController.deleteGame);

// Get dev games
router.route('/games/by/:dev_id').get(GameController.getDeveloperGames);

// Get user games
router.route('/games/from/:user_id').get(GameController.getUserGames);

// Add game to user
router.route('/games/downloaded').post(GameController.addGameToUser);

module.exports = router;
