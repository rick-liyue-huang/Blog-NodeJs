const { ErrorModel } = require("../model/resModel");

// 创建中间件
module.exports = async (ctx, next) => {
  if (ctx.session.username) {
    await next();
    return;
  }
  ctx.body = new ErrorModel("logincheck unlogin");
};
