var express = require('express'),
    morgan = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    passport = require('passport'),
    session = require('express-session');

module.exports = function(app, config) {
    app.set('views', config.projectRoot + '/server/views');
    app.set('view engine', 'jade');
    app.use(morgan('dev'));
    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded());
    app.use(session({secret: 'my complex secret'}));
    app.use(passport.initialize());
    app.use(passport.session());

    // Static files routes
    app.use(express.static(config.projectRoot + '/public'));
};