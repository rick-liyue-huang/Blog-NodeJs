const express = require("express");
const router = express.Router();
const {
  handleGetBlogList,
  handleGetBlogDetail,
  handlePostBlogNew,
  handlePostBlogUpdate,
  handlePostBlogDel
} = require("../controller/blog");
const { SuccessModel, ErrorModel } = require("../model/resModel");
const loginCheck = require("../middlewares/loginCheck");

router.get("/list", (req, res, next) => {
  console.log("req.session: ", req.session);
  let author = req.query.author || "";
  const keyword = req.query.keyword || "";

  if (req.query.isadmin) {
    if (req.session.username == null) {
      res.json(new ErrorModel("unlogin"));
      return;
    }
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
    res.json(new SuccessModel(listData)); // 对应着exec方法中 result
  });
});

router.get("/detail", (req, res, next) => {
  // 自动设置了content-type: application/json
  const detailResult = handleGetBlogDetail(req.query.id);
  return detailResult.then(detailData => {
    res.json(new SuccessModel(detailData));
  });
});

router.post("/new", loginCheck, (req, res, next) => {
  req.body.author = req.session.username; // 假数据
  const newResult = handlePostBlogNew(req.body);
  return newResult.then(newData => {
    res.json(new SuccessModel(newData));
  });
});

router.post("/update", loginCheck, (req, res, next) => {
  const updataResult = handlePostBlogUpdate(req.query.id, req.body);
  return updataResult.then(updateData => {
    if (updateData) {
      res.json(new SuccessModel());
    } else {
      res.json(new ErrorModel("update fail"));
    }
  });
});

router.post("/del", loginCheck, (req, res, next) => {
  const author = req.session.username;
  const delResult = handlePostBlogDel(req.query.id, author);
  return delResult.then(delData => {
    if (delData) {
      res.json(new SuccessModel());
    } else {
      res.json(new ErrorModel("del fail"));
    }
  });
});

module.exports = router;
