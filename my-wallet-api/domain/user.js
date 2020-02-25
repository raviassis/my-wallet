const { attributes } = require('structure');

const User = attributes({
    _id: {
        type: String,
    },
    nome: String,
    sobrenome: String,
    email: String,
    senha: String,
})(class User {});

module.exports = User;