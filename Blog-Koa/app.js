const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

// import session and redis
const session = require('koa-generic-session');
const redisStore = require('koa-redis');
const path = require('path');
const fs = require('fs');
const morgan = require('koa-morgan');

const blog = require('./routes/blog');
const user = require('./routes/user');

const { REDIS_CONFIG } = require('./config/db');

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
});

// deal with logs
const ENV = process.env.NODE_ENV;
if(ENV !== 'prod') {
  // development/test environment
  app.use(morgan('dev', {
    stream: process.stdout
  }));
} else {
  // production environment
  const logFileName = path.join(__dirname, 'logs', 'access.log');
  const writeStream = fs.createWriteStream(logFileName, {
    flags: 'a'
  });
  app.use(morgan('combined', {
    stream: writeStream
  }));
}

app.keys = ['RickHuang666'];
app.use(session({
  // config cookie
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge: 24*60*60*1000
  },
  store: redisStore({
    // all: '127.0.0.1:6379' // local redis server
    all: `${REDIS_CONFIG.host}: ${REDIS_CONFIG.port}`
  })
}))

// routes
app.use(blog.routes(), blog.allowedMethods());
app.use(user.routes(), user.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app