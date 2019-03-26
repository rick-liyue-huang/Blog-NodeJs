var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// import session middleware
const session = require('express-session');
const redisStore = require('connect-redis')(session);
const redisClient = require('./db/redis');

const blogRouter = require('./routes/blog');
const userRouter = require('./routes/user');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// connect session with redis
const sessionStore = new redisStore({
  client: redisClient
});

// decompose session
// notice that: set middleware before set router
app.use(session({
  secret: 'RickHuang666',
  cookie: {
    path: '/', // default config
    httpOnly: true, // default config
    maxAge: 24 * 60 * 60 * 1000
  },
  store: sessionStore // put redis in session
}));

app.use('/api/blog', blogRouter);
app.use('/api/user', userRouter);

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
  res.render('error');
});

module.exports = app;
