var createError = require('http-errors');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var apiClientRouter = require('./routes/clients');
var apiAdminRouter = require('./routes/admin');
var session = require('express-session');
const config = require('./config.json');
var MongoStore = require('connect-mongo')(session);

var app = express();

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/RepriseOrdi', { promiseLibrary: require('bluebird') })
  .then(() =>  console.log('connection successful'))
  .catch((err) => console.error(err));

app.use(session({
  secret: config.secret,
  resave: true,
  saveUninitialized: false,
  stor: new MongoStore({
    mongooseConnection: mongoose.connection
  })
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'dist/RepriseOrdi')));
app.use('/', express.static(path.join(__dirname, 'dist/RepriseOrdi')));
app.use('/apiClient', apiClientRouter);
app.use('/apiAdmin', apiAdminRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.sendStatus(err.status);
});

module.exports = app;