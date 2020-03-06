const {
  handleGetBlogList,
  handleGetBlogDetail,
  handlePostBlogNew,
  handlePostBlogUpdate,
  handlePostBlogDel
} = require("../controller/blog");
const { SuccessModel, ErrorModel } = require("../model/resModel");

const handleBlogRouter = (req, res) => {
  const method = req.method;
  const id = req.query.id;

  // 获取博客列表
  if ("GET" === method && "/api/blog/list" === req.path) {
    // return {
    //   msg: "blog list"
    // };
    const author = req.query.author || "";
    const keyword = req.query.keyword || "";
    const listData = handleGetBlogList(author, keyword);
    return new SuccessModel(listData);
  }
  if ("GET" === method && "/api/blog/detail" === req.path) {
    // return {
    //   msg: "blog detail"
    // };

    const detailData = handleGetBlogDetail(id);
    return new SuccessModel(detailData);
  }
  if ("POST" === method && "/api/blog/new" === req.path) {
    // return {
    //   msg: "blog new"
    // };
    const newData = handlePostBlogNew(req.body);
    return new SuccessModel(newData);
  }
  if ("POST" === method && "/api/blog/update" === req.path) {
    // return {
    //   msg: "blog update"
    // };
    const updateData = handlePostBlogUpdate(id, req.body);
    if (updateData) {
      return new SuccessModel();
    } else {
      return new ErrorModel("update error");
    }
  }
  if ("POST" === method && "/api/blog/del" === req.path) {
    // return {
    //   msg: "blog del"
    // };
    const delData = handlePostBlogDel(id);
    if (delData) {
      return new SuccessModel();
    } else {
      return new ErrorModel("del error");
    }
  }
};

module.exports = handleBlogRouter;
