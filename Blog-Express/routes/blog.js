
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
const loginCheck = require('../middlewares/loginCheck');

router.get('/list', (req, res, next) => {
  
  let author = req.query.author || '';
  const keyword = req.query.keyword || '';

  // confirm whether it is logined or not
  if(req.query.isadmin) {
    console.log('is admin'); // log
    if(req.session.username == null) {
      console.log('is not login');
      res.json(
        new ErrorModel('unlogin blog-list')
      );
      return
    }
    author = req.session.username;
  }
  
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

router.post('/new', loginCheck, (req, res, next) => {

  // only new after login
  req.body.author = req.session.username;
  const newResult = handlePostBlogNew(req.body);
  return newResult.then(newData => {
    if(newData) {
      res.json(
        new SuccessModel(newData)
      )
    } else {
      res.json(
        new ErrorModel('new fail')
      );
    }
  });

});

router.post('/update', loginCheck, (req, res, next) => {
  
  // only update after login
  // return promise object
  const updateResult = handlePostBlogUpdate(req.query.id, req.body);
  return updateResult.then(updateData => {
    if(updateData) {
      res.json(
        new SuccessModel(updateData)
      )
    } else {
      res.json(
        new ErrorModel('update fail')
      );
    }
  });
});

router.post('/del', loginCheck, (req, res, next) => {

  // only delete after login
  const author = req.session.username;
  const delResult = handlePostBlogDel(req.query.id, author);
  return delResult.then(delData => {
    if(delData) {
      res.json(
        new SuccessModel(delData)
      )
    } else {
      res.json(
        new ErrorModel('del fail')
      );
    }
  });
})

module.exports = router;