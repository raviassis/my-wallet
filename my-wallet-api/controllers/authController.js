const constants = require('../constants');
const Unauthorized = require('../erros/unauthorized');
module.exports= class AuthController {
    constructor(opts){
        this.authService = opts.authService;
    }

    async post(req, resp, next) {
        try {
            var result = await this.authService.login(req.body.email, req.body.senha);
            resp.status(constants.HTTP_STATUS_CODES.OK).json(result);
        } catch (e) {
            if (e instanceof Unauthorized) {
                resp.status(constants.HTTP_STATUS_CODES.UNAUTHORIZED).json({errors: [{message: e.message}]});
            } else {
                next(e);
            } 
        }
        
    }
}