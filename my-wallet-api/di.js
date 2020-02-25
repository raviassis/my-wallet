const awilix = require('awilix');
const MongoClient = require('mongodb').MongoClient;
const uriMongoDb = process.env.MONGODB_URI;
const UserRepository = require('./data/userRepository');
const UserService = require('./services/userService');

const container = awilix.createContainer({
    injectionMode: awilix.InjectionMode.PROXY
});

container.register({
    uriDb: awilix.asValue(uriMongoDb),
    dbClient: awilix.asValue(MongoClient),
    // userRepository: awilix.asClass(UserRepository),
    // userService: awilix.asClass(UserService),
    // userController: awilix.asClass(UserController),
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