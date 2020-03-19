const { attributes } = require('structure');

module.exports = attributes({
    _id: {
        type: String,
    },
    nome: String,
    sobrenome: String,
    email: String,
    senha: String,
})(class User {});