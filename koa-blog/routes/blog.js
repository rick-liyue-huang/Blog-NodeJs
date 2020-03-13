const router = require("koa-router")();
const {
  handleGetBlogList,
  handleGetBlogDetail,
  handlePostBlogNew,
  handlePostBlogUpdate,
  handlePostBlogDel
} = require("../controller/blog");
const { SuccessModel, ErrorModel } = require("../model/resModel");
const loginCheck = require("../middlewares/loginCheck");

router.prefix("/api/blog");

router.get("/list", async (ctx, next) => {
  console.log("req.session: ", ctx.session);
  let author = ctx.query.author || "";
  const keyword = ctx.query.keyword || "";

  if (ctx.query.isadmin) {
    if (ctx.session.username == null) {
      ctx.body = new ErrorModel("unlogin");
      return;
    }
    author = ctx.session.username;
  }

  // const listData = handleGetBlogList(author, keyword);
  // return new SuccessModel(listData);
  const listData = await handleGetBlogList(author, keyword);
  ctx.body = new SuccessModel(listData);
});

router.get("/detail", async (ctx, next) => {
  // 自动设置了content-type: application/json
  const detailData = await handleGetBlogDetail(ctx.query.id);
  ctx.body = new SuccessModel(detailData);
});

router.post("/new", loginCheck, async (ctx, next) => {
  ctx.request.body.author = ctx.session.username; // 假数据
  const newData = await handlePostBlogNew(ctx.request.body);
  ctx.body = new SuccessModel(newData);
});

router.post("/update", loginCheck, async (ctx, next) => {
  const updateData = await handlePostBlogUpdate(ctx.query.id, ctx.request.body);
  if (updateData) {
    ctx.body = new SuccessModel();
  } else {
    ctx.body = new ErrorModel("update fail");
  }
});

router.post("/del", loginCheck, async (ctx, next) => {
  const author = ctx.session.username;
  const delData = await handlePostBlogDel(ctx.query.id, author);
  if (delData) {
    ctx.body = new SuccessModel();
  } else {
    ctx.body = new ErrorModel("del fail");
  }
});

module.exports = router;
