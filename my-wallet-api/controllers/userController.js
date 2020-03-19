const UserExistError = require('../erros/userExistError');
const constants = require('../constants');
module.exports = class UserController {
    constructor(opts){
        this.userService = opts.userService;
    }

    async post(req, resp, next) {
        try {
            debugger;
            var result = await this.userService.createUser(req.body);
            resp.status(constants.HTTP_STATUS_CODES.CREATED).json(result);
        } catch(e) {
            if (e instanceof UserExistError) {
                resp.status(constants.HTTP_STATUS_CODES.BAD_REQUEST).json({errors: [{message: e.message}]});
            } else {
                next(e);
            }            
        }       
        
    }
}