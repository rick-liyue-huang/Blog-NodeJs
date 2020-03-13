const Koa = require("koa");
const app = new Koa();
const views = require("koa-views");
const json = require("koa-json"); // application/json
const onerror = require("koa-onerror");
const bodyparser = require("koa-bodyparser"); //req.body
const logger = require("koa-logger"); // log
const session = require("koa-generic-session");
const redisStore = require("koa-redis");
const path = require("path");
const fs = require("fs");
const morgan = require("koa-morgan");
const { REDIS_CONFIG } = require("./config/db");

// routes
const blog = require("./routes/blog");
const user = require("./routes/user");

// error handler
onerror(app); // 如果发生错误处理

// middlewares
app.use(
  bodyparser({
    enableTypes: ["json", "form", "text"]
  })
);
app.use(json());
app.use(logger());
app.use(require("koa-static")(__dirname + "/public"));

app.use(
  views(__dirname + "/views", {
    extension: "pug"
  })
);

// logger： 这里的logger只是提供开发环境下的优美格式，没有实际作用
app.use(async (ctx, next) => {
  const start = new Date();
  await next(); // 进入到下一个模型，返回的promise对象在next中接收这个promise对象
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// 这里已经开始在dev环境中在控制台处理log
const ENV = process.env.NODE_ENV;
if (ENV !== "production") {
  // development environment
  app.use(
    morgan("dev", {
      // stream: process.stdout // 默认状态，直接输入到控制台
    })
  );
} else {
  // production environment
  // 将日志写入文件
  const logFileName = path.join(__dirname, "logs", "access.log");
  const writeStream = fs.createWriteStream(logFileName, {
    flags: "a"
  });
  app.use(
    morgan("combined", {
      stream: writeStream
    })
  );
}

// 洋葱圈模型

// session 配置
app.keys = ["RICKHUANG_123456"];
app.use(
  session({
    // 配置cookie
    cookie: {
      path: "/",
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000
    },
    // 配置redis
    store: redisStore({
      all: `${REDIS_CONFIG.host}:${REDIS_CONFIG.port}` // 选取本地的redis
    })
  })
);

// routes
app.use(blog.routes(), blog.allowedMethods());
app.use(user.routes(), user.allowedMethods());

// error-handling
app.on("error", (err, ctx) => {
  console.error("server error", err, ctx);
});

console.log("pm2 log");
console.error("pm2 error");

module.exports = app;
