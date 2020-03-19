const uriMongoDb = 'mongodb://heroku_jskx4c55:709tnfd1ol621sojarahcl9sre@ds033629.mlab.com:33629/heroku_jskx4c55';

module.exports =  class BaseRepository {
    constructor(collection, uri, dbClient) {        
        this.collection = collection;
        this.uri = uri;
        this.dbClient = dbClient;
        this.options = {useUnifiedTopology: true};
    }

    async insertOne(obj) {
        const conection = await this.dbClient.connect(this.uri, this.options);
        const result = (await conection.db()
                        .collection(this.collection)
                        .insertOne(obj)).ops[0];
        conection.close();
        return result;
    }

    async findOne(query) {
        const conection = await this.dbClient.connect(this.uri, this.options);
        const result = await conection.db()
                        .collection(this.collection)
                        .findOne(query);
        conection.close();
        return result;
    }

    async createCollection(){
        const conection = await this.dbClient.connect(this.uri, this.options);
        await conection.db().createCollection(this.collection);
        conection.close();
    }
}