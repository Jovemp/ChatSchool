const path = require('path');
const morgan = require('morgan');
const methodOverride = require('method-override');
const expressSession = require('express-session');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const hbs = require('express-hbs');
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

module.exports = (app) =>{
    app.set('port', 9000);
    app.set('host', '127.0.0.1');
    app.set('views', path.join(__dirname, './../../../build/views'));
    app.set('view engine', 'hbs');
    app.set('assets', path.join(__dirname, './../../../build'));
    app.set('mongo_host','127.0.0.1');
    app.set('mongo_port','27017');
    app.set('mongo_db','chatschool_dev');
    app.set('mongo_url',`mongodb://${app.settings.mongo_host}:${app.settings.mongo_port}/${app.settings.mongo_db}`)

    app.use(express.static(app.settings.assets));
    app.use(morgan('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(methodOverride('_method'));
    app.use(expressSession({
        secret: '%DJKCNMN*(*¨FDJKKnmn',
        resave: false,
        saveUninitialized: false
    }));
    app.use(expressValidator());
    app.engine('hbs', hbs.express4({
        defaultLayout: path.join(app.settings.views, 'layouts/main.hbs'),
        partialsDir: path.join(app.settings.views, 'partials'),
        layoutDir: path.join(app.settings.views, 'layouts')
    }));

    mongoose.connect(app.settings.mongo_url);

    app.use(passport.initialize());
    app.use(passport.session());
    passport.use(new LocalStrategy(require('./../../schemas/users').authenticate()));
    passport.serializeUser(require('./../../schemas/users').serializeUser());
    passport.deserializeUser(require('./../../schemas/users').deserializeUser());
    

    require('./../helpers')(hbs);

}