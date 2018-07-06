var createError = require('http-errors');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
const jwt = require('./helpers/jwt');
var apiClientRouter = require('./routes/clients');
var apiAdminRouter = require('./routes/admin')

var app = express();

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/RepriseOrdi', { promiseLibrary: require('bluebird') })
  .then(() =>  console.log('connection successful'))
  .catch((err) => console.error(err));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(jwt());
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