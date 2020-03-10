var createError = require("http-errors");
var express = require("express");
var path = require("path");
// 可以使用cookie
var cookieParser = require("cookie-parser");
// 实现 logger功能
var logger = require("morgan");

const blogRouter = require("./routes/blog");
const userRouter = require("./routes/user");

var app = express();

// view engine setup
// 对应views文件夹
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
// getpostdata方法 req.body
app.use(express.json());
// 兼容 content-type: appliation/json 或者其他的格式
app.use(express.urlencoded({ extended: false }));
// 解析cookie
app.use(cookieParser());
// 对应public文件夹
app.use(express.static(path.join(__dirname, "public")));

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