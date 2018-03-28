const path = require('path');
const morgan = require('morgan');
const methodOverride = require('method-override');
const expressSession = require('express-session');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const hbs = require('express-hbs');
const express = require('express');
const mongoose = require('mongoose');

module.exports = (app) =>{
    app.set('port', 8082);
    app.set('host', '127.0.0.1');
    app.set('views', path.join(__dirname, './../../../dist/views'));
    app.set('view engine', 'hbs');
    app.set('assets', path.join(__dirname, './../../../dist'));
    app.set('mongo_host','127.0.0.1');
    app.set('mongo_port','27017');
    app.set('mongo_db','chatschool_dev');
    app.set('mongo_url',`mongodb://${app.settings.mongo_host}:${app.settings.mongo_port}/${app.settings.mongo_db}`)

    
    app.use(express.static(app.settings.assets));
    app.use(morgan('combined'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false, limit: '200k'}));
    app.use(methodOverride('_method'));
    app.use(expressSession({
        secret: '9856545421254%%$64646$',
        resave: false,
        saveUninitialized: false
    }));
    app.use(expressValidator())
    app.engine('hbs', hbs.express4({
        defaultLayout: path.join(app.settings.views, 'layout/main.hbs'),
        partialsDir: path.join(app.settings.views, 'partials'),
        layoutDir: path.join(app.settings.views, 'layouts')
    }));

    mongoose.connect(app.settings.mongo_url);
}