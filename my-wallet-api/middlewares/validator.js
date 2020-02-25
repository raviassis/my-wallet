//validate body request
exports.validate = (validator) => {
    return (req, res, next) => {
        try {
            req.validBody = validator.clone(req.body);
            const validation = req.validBody.validate();
            if (!validation.valid) {
                res.status(422).json({ errors: validation.errors });
                return;
            }
            next();
        } catch (error) {
            next(error);
        }
        
    };
    
};