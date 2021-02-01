const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const userRoutes = require('./api/routes/user');
const eventRoutes = require('./api/routes/events');

mongoose.connect(`mongodb+srv://admin:${process.env.MONGO_ATLAS_PW}@cluster0.zyywd.mongodb.net/<dbname>?retryWrites=true&w=majority`, 
{
    useNewUrlParser: true,
    useUnifiedTopology:true
    //useMongoClient: true
});
mongoose.Promise = global.Promise;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); //instead of '*', restrict using 'http://my-cool-page.com
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next(); //apply for else if json not return in the if loop
});


//Routes which should handle requests
app.use('/user', userRoutes);
app.use('/events', eventRoutes);


app.use((req, res, next) => {
    const error = new Error('not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
            error: {
                message: error.message
            }
    });
});

module.exports = app;