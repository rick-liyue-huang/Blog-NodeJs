const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-generic-session');
const redisStore = require('koa-redis');
// const jwtKoa = require('koa-jwt');

const { REDIS_CONFIG } = require('./conf/db');
const { SESSION_SECRET_KEY } = require('./conf/secret');
const { isProd } = require('./utils/env');
// const { SECRET } = require('./conf/constants');

const index = require('./routes/index');
const userViewRouter = require('./routes/view/user');
const userApiRouter = require('./routes/api/user');
const errorViewRouter = require('./routes/view/error');

// error handler on page
let onerrorConf = {};
// 在生产环境，才显示用户友好的界面，否则就是简单的页面
if(isProd) {
  onerrorConf = {
    redirect: '/error'
  };
}

onerror(app, onerrorConf);

// jwt
/*
app.use(jwtKoa({
  secret: SECRET
}).unless({
  path: [/^\/users\/login/] // 那些自定义目录忽略jwt验证
}));
*/

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
app.keys = [SESSION_SECRET_KEY];

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
app.use(index.routes(), index.allowedMethods());
// apply view and api user router
app.use(userApiRouter.routes(), userApiRouter.allowedMethods());
app.use(userViewRouter.routes(), userViewRouter.allowedMethods());
// 404 must register on the bottom
app.use(errorViewRouter.routes(), errorViewRouter.allowedMethods());

// error-handling on console
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
