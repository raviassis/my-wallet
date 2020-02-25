const User = require('../domain/user');
const UserExistError = require('../erros/userExistError');
module.exports = class UserController {
    constructor(opts){
        console.log('UserController Created.');
        this.userService = opts.userService;
    }

    async post(req, resp, next) {
        const user = new User(req.body);
        try {
            var result = await this.userService.createUser(user);
            resp.status(201).json(result);
        } catch(e) {
            if (e instanceof UserExistError) {
                resp.status(400).json({errors: [{message: e.message}]});
            }
            throw e;
        }       
        
    }
}