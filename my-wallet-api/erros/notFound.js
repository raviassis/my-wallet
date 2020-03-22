const constants = require('../constants');
module.exports = class NotFound extends Error {
    constructor(msg){
        super(msg);
    }
}