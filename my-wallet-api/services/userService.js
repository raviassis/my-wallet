const User = require('../domain/user');
const UserExistError = require('../erros/userExistError');
module.exports = class UserService {
    constructor(opts){
        this.userRepository = opts.userRepository;
        this.hasher = opts.hasher;
    }

    async createUser(body){
        let user = new User(body);
        const userExist = await this.userRepository.findOne({email: user.email});
        if (userExist) {
            throw new UserExistError();
        }
        user.senha = this.hasher.generate(user.senha);
        user = await this.userRepository.insertOne(user);
        user.senha = undefined;
        return { nome: user.nome, sobrenome: user.sobrenome, email: user.email };
    }
}