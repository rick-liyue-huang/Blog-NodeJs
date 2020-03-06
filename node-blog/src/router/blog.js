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
    // const listData = handleGetBlogList(author, keyword);
    // return new SuccessModel(listData);
    const listResult = handleGetBlogList(author, keyword);
    console.log("listResult: ---", listResult);
    // 为了在后面继续使用，也是返回promise对象
    return listResult.then(listData => {
      console.log("listData in blog router: ", listData);
      console.log(new SuccessModel(listData));
      return new SuccessModel(listData); // 对应着exec方法中 result
    });
  }
  if ("GET" === method && "/api/blog/detail" === req.path) {
    // return {
    //   msg: "blog detail"
    // };

    // const detailData = handleGetBlogDetail(id);
    // return new SuccessModel(detailData);
    const detailResult = handleGetBlogDetail(id);
    return detailResult.then(detailData => {
      return new SuccessModel(detailData);
    });
  }
  if ("POST" === method && "/api/blog/new" === req.path) {
    // return {
    //   msg: "blog new"
    // };
    // const newData = handlePostBlogNew(req.body);
    // return new SuccessModel(newData);
    req.body.author = "rick"; // 假数据
    const newResult = handlePostBlogNew(req.body);
    return newResult.then(newData => {
      return new SuccessModel(newData);
    });
  }
  if ("POST" === method && "/api/blog/update" === req.path) {
    // return {
    //   msg: "blog update"
    // };
    // const updateData = handlePostBlogUpdate(id, req.body);
    // if (updateData) {
    //   return new SuccessModel();
    // } else {
    //   return new ErrorModel("update error");
    // }
    const updataResult = handlePostBlogUpdate(id, req.body);
    return updataResult.then(updateData => {
      if (updateData) {
        return new SuccessModel();
      } else {
        return new ErrorModel("update fail");
      }
    });
  }
  if ("POST" === method && "/api/blog/del" === req.path) {
    // return {
    //   msg: "blog del"
    // };
    // const delData = handlePostBlogDel(id);
    // if (delData) {
    //   return new SuccessModel();
    // } else {
    //   return new ErrorModel("del error");
    // }
    const author = "rick";
    const delResult = handlePostBlogDel(id, author);
    return delResult.then(delData => {
      if (delData) {
        return new SuccessModel();
      } else {
        return new ErrorModel("del fail");
      }
    });
  }
};

module.exports = handleBlogRouter;
