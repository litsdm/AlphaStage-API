var express = require('express');
var router = express.Router();
var UploadController = require('../controllers/upload.controller.js');

// sign request
router.route('/sign-s3').get(UploadController.signRequest);

module.exports = router;
