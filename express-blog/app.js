var createError = require("http-errors");
var express = require("express");
var path = require("path");
const fs = require("fs");
// 可以使用cookie
var cookieParser = require("cookie-parser");
// 实现 logger功能
var logger = require("morgan");
const session = require("express-session");
const RedisStore = require("connect-redis")(session);

const blogRouter = require("./routes/blog");
const userRouter = require("./routes/user");

var app = express();

// view engine setup
// 对应views文件夹
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "jade");

// 这里已经开始在dev环境中在控制台处理log
const ENV = process.env.NODE_ENV;
if (ENV !== "production") {
  // development environment
  app.use(
    logger("dev", {
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
    logger("combined", {
      stream: writeStream
    })
  );
}

// getpostdata方法 req.body
app.use(express.json());
// 兼容 content-type: appliation/json 或者其他的格式
app.use(express.urlencoded({ extended: false }));
// 解析cookie
app.use(cookieParser());
// 对应public文件夹
// app.use(express.static(path.join(__dirname, "public")));

// session 要存在Redis里面
const redisClient = require("./db/redis");
const sessionStore = new RedisStore({
  client: redisClient
});
// 处理session 得到 req.session
app.use(
  session({
    secret: `RICKHUANG_123456`,
    cookie: {
      path: "/", // 默认配置
      httpOnly: true, // 默认配置
      maxAge: 24 * 60 * 60 * 1000
    },
    store: sessionStore
  })
);

// 处理路由
app.use("/api/blog", blogRouter);
app.use("/api/user", userRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
