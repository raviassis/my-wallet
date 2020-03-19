const constants = require('../constants');
//validate body request
exports.validate = (validator) => {
    return (req, res, next) => {
        try {
            const validation = validator.clone(req.body).validate();
            debugger;
            if (!validation.valid) {
                res.status(constants.HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY).json({ errors: validation.errors });
                return;
            }
            next();
        } catch (error) {
            next(error);
        }
        
    };
    
};