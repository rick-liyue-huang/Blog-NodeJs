const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-generic-session');
const redisStore = require('koa-redis');
const { REDIS_CONFIG } = require('./conf/db');

const index = require('./routes/index')
const users = require('./routes/users')

// error handler on page
onerror(app)

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

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// config the session and redis before using routers
// session configuration
app.keys = ['rick.liyue.huang@gmail.com'];

app.use(session({
  key: 'blog.sid', // cookie name default as koa.sid
  prefix: 'blog:sess:', // redis key prefix default as koa:sess:
  cookie: {
    path: '/',
    httpOnly: true, // only set cookie on server side
    maxAge: 24 * 60 * 60 * 1000, // cookie valid time
  },
  ttl: 24 * 60 * 60 * 1000, // redis valid time default as maxAge 
  store: redisStore({
    all: `${REDIS_CONFIG.host}:${REDIS_CONFIG.port}`
  })
}))

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

// error-handling on console
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
