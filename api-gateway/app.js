var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require("mongoose");

var indexRouter = require('./routes/index');

var app = express();

// //mLab connection
// var mongoDB = "mongodb+srv://admin:admin@buwebdev-cluster-1-7jtao.mongodb.net/api-gateway?retryWrites=true&w=majority";
// mongoose.connect(mongoDB, {
//   useMongoClient: true
// });

// mongoDB.Promise = global.Promise;
// var db = mongoose.connection;
// db.on("error", console.error.bind(console, "\nMongoDB connection error: "));
// db.once("open", function () {
//   console.log("\nApplication connected to mLab MongoDB instance\n");
// });

mongoose.Promise = require('bluebird');
/**
*
Database connection
*/
mongoose.connect('mongodb+srv://admin:admin@buwebdev-cluster-1-7jtao.mongodb.net/api-gateway?retryWrites=true&w=majority', {
  promiseLibrary: require('bluebird')
}).then(() => console.log('\nconnection successful\n'))
  .catch((err) => console.error(err));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

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
