const BaseRepository = require('./base/baseRepository');
module.exports = class UserRepository extends BaseRepository {
    constructor(opts){
        super('users', opts.uriDb, opts.dbClient);
    }
}