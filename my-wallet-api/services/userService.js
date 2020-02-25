const hash = require('password-hash');
const UserExistError = require('../erros/userExistError');
module.exports = class UserService {
    constructor(opts){
        this.userRepository = opts.userRepository;
    }

    async createUser(user){
        const userExist = await this.userRepository.findOne({email: user.email});
        if (userExist) {
            throw new UserExistError();
        }
        user.senha = hash.generate(user.senha);
        user = await this.userRepository.insertOne(user);
        user.senha = undefined;
        return user;
    }
}