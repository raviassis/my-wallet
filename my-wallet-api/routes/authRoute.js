const awilixExpress = require('awilix-express');
const validator = require('../middlewares/validator');
const AuthValidator = require('../controllers/validators/authValidator');
const AuthController = require('../controllers/authController');
module.exports = awilixExpress.createController(AuthController)
                    .prefix('/auth')
                    .before(validator.validate(new AuthValidator()))
                    .post('', 'post');