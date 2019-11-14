const Koa = require('koa');
const app = new Koa();

// logger

app.use(async (ctx, next) => {
  console.log('first start');
  await next();
  const rt = ctx.response.get('X-Response-Time');
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
  console.log('first end')
});

// x-response-time

app.use(async (ctx, next) => {
  console.log('second start')
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
  console.log('second end')
});

// response

app.use(async ctx => {
  console.log('third start');
  ctx.body = 'Hello World';
  console.log('third end');
});

app.listen(3000);