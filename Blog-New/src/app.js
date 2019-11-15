const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-generic-session');
const redisStore = require('koa-redis');

const { REDIS_CONFIG } = require('./config/db');

const index = require('./routes/index')
const users = require('./routes/users')

// error handler
onerror(app) // show error on webpage

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))


// 用户无论是否登录访问的时候都会创建一个cookie，客户端下次的访问的时候就带着这个cookie，然后server端就根据这个cookie访问redis。
app.keys = ['rickliyuehuang_666!'];
app.use(session({
  key: 'blog.sid', // cookie name default as koa.sid
  prefix: 'blog:sess:', // redis key prefix default as koa:sess:
  cookie: {
    path: '/',
    httpOnly: true, // only server can change cookie
    maxAge: 24 * 60 * 60 * 1000 // cookie valid time
  },
  ttl: 24 * 60 * 60 * 1000, // session valid time default as maxAge
  store: redisStore({
    all: `${REDIS_CONFIG.host}:${REDIS_CONFIG.port}`
  }) // store the session in redis
}));


// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

// error-handling
// print the error info on server console
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
