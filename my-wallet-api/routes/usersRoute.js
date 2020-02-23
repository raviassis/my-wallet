var express = require('express');
var router = express.Router();
var usersController = require('../controllers/usersController');

router.post(
    '/',
    usersController.validate('post'),
    usersController.post
);

module.exports = router;
