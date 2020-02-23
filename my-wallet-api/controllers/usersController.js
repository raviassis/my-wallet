const { check, validationResult } = require('express-validator');

exports.validate = (method) => {
    switch (method) {
        case 'post': {
            return  [
                check('nome', 'nome não informado').notEmpty(),
                check('sobrenome', 'sobrenome não informado').notEmpty(),
                check('email', 'email não informado').notEmpty(),
                check('email', 'deve ser um email valido').isEmail(),
                check('senha', 'senha não informada').notEmpty(),
                check('senha', 'deve ter no mínimo 8 caracteres').isLength({ min: 8}),
            ];
        }
    }
};

exports.post = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(422).json({ errors: errors.array() });
        return;
    }
    res.status(201).json(req.body);
};