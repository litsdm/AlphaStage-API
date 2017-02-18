var express = require('express');
var router = express.Router();
var GameController = require('../controllers/game.controller.js');

// Add game
router.route('/games').post(GameController.addGame, GameController.addGameToDeveloper);

// Get all games
router.route('/games').get(GameController.getGames);

// Get a single game
router.route('/games/:game_id').get(GameController.getGame);

// Edit game
router.route('/games/:game_id').put(GameController.editGame);

// Delete game
router.route('/games/:game_id').delete(GameController.deleteGame);

module.exports = router;
