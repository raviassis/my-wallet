const { attributes } = require('structure');
const userValidator = attributes({
    nome: {
        type: String,
        required: true,
    },
    sobrenome: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        email: true,
    },
    senha: {
        type: String,
        required: true,
        minLength: 8,
    },
})(class UserValidator {});

module.exports = userValidator;