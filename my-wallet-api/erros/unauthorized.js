const constants = require('../constants');
module.exports = class Unauthorized extends Error {
    constructor(msg){
        super(msg);
    }
}