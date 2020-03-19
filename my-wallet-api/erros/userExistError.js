const constants = require('../constants');
module.exports = class UserExistError extends Error {
    constructor(){
        super(constants.ERROR_MSGS.USER_EXIST_ERROR);
    }
}