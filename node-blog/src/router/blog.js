const {
  handleGetBlogList,
  handleGetBlogDetail,
  handlePostBlogNew,
  handlePostBlogUpdate,
  handlePostBlogDel
} = require("../controller/blog");
const { SuccessModel, ErrorModel } = require("../model/resModel");

// 定义统一的登录验证函数
const loginCheck = req => {
  if (!req.session.username) {
    return Promise.resolve(new ErrorModel("尚未登录"));
  }
};

const handleBlogRouter = (req, res) => {
  const method = req.method;
  const id = req.query.id;

  // 获取博客列表
  if ("GET" === method && "/api/blog/list" === req.path) {
    // return {
    //   msg: "blog list"
    // };
    let author = req.query.author || "";
    const keyword = req.query.keyword || "";

    if (req.query.isadmin) {
      // 管理员界面
      const loginCheckResult = loginCheck(req);
      if (loginCheckResult) {
        // 未登录
        return loginCheckResult;
      }
      // 强制查询自己的博客
      author = req.session.username;
    }

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

    const loginCheckResult = loginCheck(req);
    if (loginCheckResult) {
      return loginCheckResult;
    }
    req.body.author = req.session.username; // 假数据
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

    const loginCheckResult = loginCheck(req);
    if (loginCheckResult) {
      return loginCheckResult;
    }
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

    const loginCheckResult = loginCheck(req);
    if (loginCheckResult) {
      return loginCheckResult;
    }
    const author = req.session.username;
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
