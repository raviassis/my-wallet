const awilix = require('awilix');
const MongoClient = require('mongodb').MongoClient;
var jwt = require('jsonwebtoken');
const uriMongoDb = process.env.MONGODB_URI;
const SECRET = 'SEGREDO';
const hash = require('password-hash');

const container = awilix.createContainer({
    injectionMode: awilix.InjectionMode.PROXY
});

container.register({
    uriDb: awilix.asValue(uriMongoDb),
    dbClient: awilix.asValue(MongoClient),
    hasher: awilix.asValue(hash),
    SECRET: awilix.asValue(SECRET),
    jwt : awilix.asValue(jwt),
});

container.loadModules(
    [
        'data/*.js',
        'services/*.js',
        'controllers/*.js',
    ],
    {
        formatName: "camelCase",
        resolverOptions: {
            lifetime: awilix.Lifetime.SCOPED,
        }
    },
);

module.exports = container;