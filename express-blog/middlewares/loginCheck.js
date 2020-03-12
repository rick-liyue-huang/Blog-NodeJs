const { ErrorModel } = require("../model/resModel");

// 创建中间件
module.exports = (req, res, next) => {
  if (req.session.username) {
    next();
    return;
  }
  res.json(new ErrorModel("logincheck unlogin"));
};
