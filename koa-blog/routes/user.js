const router = require("koa-router")();
const { handlePostUserLogin } = require("../controller/user");
const { SuccessModel, ErrorModel } = require("../model/resModel");

router.prefix("/api/user");

router.post("/login", async (ctx, next) => {
  const { username, password } = ctx.request.body;

  const userData = await handlePostUserLogin(username, password);
  if (userData.username) {
    ctx.session.username = userData.username;
    ctx.session.realname = userData.realname;
    // 不需要同步都redis
    ctx.body = new SuccessModel();
  } else {
    ctx.body = new ErrorModel("unlogin");
  }
});

module.exports = router;
