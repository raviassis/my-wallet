const validator = require('../middlewares/validator');
const userValidator = require('../controllers/validators/userValidator');
const awilixExpress = require('awilix-express');
const UserController = require('../controllers/userController');

module.exports = awilixExpress.createController(UserController)
                                .prefix('/users')
                                .before(validator.validate(new userValidator()))
                                .post('', 'post');
