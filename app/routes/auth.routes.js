var express = require('express');
var router = express.Router();
var AuthController = require('../controllers/auth.controller.js');

// Signup
router.route('/signup').post(AuthController.signUp);

// Login
router.route('/login').post(AuthController.login);

module.exports = router;
