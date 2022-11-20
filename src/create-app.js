const express = require('express');
const { v1: uuidv1 } = require('uuid');


module.exports = (config) => {
    if (process.env.NODE_ENV !== 'production') {
        require('dotenv').config()
    } 
    const app = express();
    const expressLayouts = require('express-ejs-layouts')
    const indexRouter = require('./routes/form')


    app.set('view engine', 'ejs')
    app.set('views', __dirname + '/views')
    app.set('layout', 'layouts/layout')
    app.use(expressLayouts)
    app.use(express.static('public'))

    const requestFilter = (req, res, next) => {
        res.locals.log = logWithRequestData(req.method, req.path, uuidv1());
        next();
    };

    const logWithRequestData = (method, path, id) => (...message) => {
        console.log(`[${method}][${path}][${id}]`, ...message);
    };



//connect to mongodb
    const mongoose = require('mongoose')
    mongoose.connect(process.env.DATABASE_URL, { useNewURLParser: true })
    const db = mongoose.connection
    db.on('error', error => console.error(error))
    db.once('open', () => console.log('Connected to Mongoose'))
//end of code



    app.enable('trust proxy'); // for trusting heroku proxy
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(requestFilter);

    app.use('/', indexRouter.router)

    return app
};
