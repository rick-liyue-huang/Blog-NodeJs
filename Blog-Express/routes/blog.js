
const express = require('express');
const router = express.Router();
const { SuccessModel, ErrorModel } = require('../model/resModel');
const {
  handleGetBlogList,
  handleGetBlogDetail,
  handlePostBlogNew,
  handlePostBlogUpdate,
  handlePostBlogDel
} = require('../controller/blog');

router.get('/list', (req, res, next) => {
  
  let author = req.query.author || '';
  const keyword = req.query.keyword || '';

  // confirm whether it is logined or not
  // if(req.query.isadmin) {
  //   const loginResult = loginCheck(req);
  //   if(loginResult) {
  //     return loginResult
  //   }
    
  //   author = req.session.username;
  // }
  
  // get promise
  const listResult = handleGetBlogList(author, keyword);
  return listResult.then(listData => {
    if(listData) {
      // resolve data
      res.json(
        new SuccessModel(listData)
      );
    } else {
      res.json(
        new ErrorModel('list fail')
      );
    }
  });

});

router.get('/detail', (req, res, next) => {
  
  const id = req.query.id;
  const detailResult = handleGetBlogDetail(id);
  return detailResult.then(detailData => {
    if(detailData.id) {
      res.json(
        new SuccessModel(detailData)
      );
    } else {
      res.json(
        new ErrorModel('detail fail')
      );
    }
  });

});

module.exports = router;