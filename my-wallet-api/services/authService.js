const Unauthorized = require('../erros/unauthorized');
const constantes = require('../constants');
module.exports = class AuthService {
    constructor(opts) {
        this.userRepository = opts.userRepository;
        this.hasher = opts.hasher;
        this.jwt = opts.jwt;
        this.secret = opts.SECRET;
    }

    async login(email, senha) {
        const user = await this.userRepository.findOne({email: email});
        if (!user) {
            throw new Unauthorized(constantes.ERROR_MSGS.USER_UNAUTHORIZED);
        }
        const authenticated = this.hasher.verify(senha, user.senha);
        if (authenticated) {
            const token = this.jwt.sign(
                {
                    email: user.email,
                    nome: user.nome,
                    sobrenome: user.sobrenome,
                },
                this.secret
            );
            return {
                email: user.email,
                nome: user.nome,
                sobrenome: user.sobrenome,
                token: token,
            };
        } else {
            throw new Unauthorized(constantes.ERROR_MSGS.USER_UNAUTHORIZED);
        }
    }
}