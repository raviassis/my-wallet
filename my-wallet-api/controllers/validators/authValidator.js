const { attributes } = require('structure');
module.exports = attributes({
    email: {
        type: String,
        required: true,
        email: true,
    },
    senha: {
        type: String,
        required: true,
    },
})(class AuthValidator {});