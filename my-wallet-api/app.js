require('dotenv').config();
var express = require('express');
var path = require('path');
var cors = require('cors');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const di = require('./di');
const awilixExpress = require('awilix-express');

//init mongodb
var UserRepository = di.resolve('userRepository');
UserRepository.createCollection();

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(awilixExpress.scopePerRequest(di));
app.use(awilixExpress.loadControllers('routes/*.js', {cwd: __dirname}));

module.exports = app;
