var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();
var indexRouter = require('./controllers/index');
var usersController = require('./controllers/users');
var departmentController = require('./controllers/department');
var formController = require('./controllers/form');
var authController = require('./controllers/auth');
var session = require('express-session');
var mongoStore = require('connect-mongo')(session);
var cors = require('cors');
var jwt = require('jsonwebtoken');

var passport = require('passport');

passport.serializeUser(function (user, cb) {
    cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
});
var app = express();

app.use(passport.initialize());
app.use(passport.session());


/* const mongoClient = require('mongodb').MongoClient;
const uri = 'mongodb+srv://hafeez_khan_826:hafeez_khan_826@democluster-tnrcz.mongodb.net/test'

mongoClient.connect(uri, { useUnifiedTopology: true }, { useNewUrlParser: true }, (err, db) => {
  if (err) {
    console.log('Error while connection', err);
  } else {
    console.log('connection successful', db);
  }
}) */
/* const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://hafeez_khan:hafeez_khan@democluster-tnrcz.mongodb.net/test?retryWrites=true&w=majority";
mongoose.Promise = global.Promise
MongoClient.connect(uri, { useNewUrlParser: true }, { useUnifiedTopology: true }, (err, db) => {
  console.log('Let it be known: ', err);
  // const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  // client.close();
}); */

var mongoose = require('mongoose')
mongoose.Promise = global.Promise

const uri = "mongodb+srv://hafeez_khan:hafeez_khan@democluster-tnrcz.mongodb.net/SwitchOnDB?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true }, (err, client) => {
    if (err) {
        console.log({ err });
    } else {

        // console.log({client});
    }
    // const collection = client.db('SwitchOnDB');
});

app.use(session({
    secret: 'expresssecret',
    resave: true,
    httpOnly: true,
    saveUninitialized: true,
    store: new mongoStore({ mongooseConnection: mongoose.connection }),
    cookie: { maxAge: 80 * 80 * 800 }
}));

// client.connect();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cors({
    origin: '*',
    withCredentials: false,
    allowedHeaders: ['Content-Type', 'userid', 'token', 'Authorization', 'X- Requested - With', 'X- Content - Type - Options', 'X- Frame - Options', 'Accept', 'Origin']
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, './client')));

app.use('/', indexRouter);
app.use('/users', usersController);
app.use('/department', departmentController);
app.use('/form', formController);
app.use('/auth', authController);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
