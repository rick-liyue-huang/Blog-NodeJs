
const express = require('express');
const router = express.Router();
const { SuccessModel, ErrorModel } = require('../model/resModel');
const {
  handleGetList, handleGetDetail,
  handlePostNew, handlePostUpdate, handlePostDel
} = require('../controllers/blog');
const loginCheck = require('../middlewares/logincheck');


router.get('/list', (req, res, next) => {

  let author = req.query.author || '';
  const keyword = req.query.keyword || '';

  if(req.query.isadmin) {
    console.log('this is admin');
    if(req.session.username == null) {
      res.json(new ErrorModel('unlogin---'));
      return
    }
    author = req.session.username;
  }
  
  const listResult = handleGetList(author, keyword);
  console.log('listResult: ', listResult);
  return listResult.then(listData => {
    console.log('listData: ', listData);
    if(listData) {
      res.json(new SuccessModel(listData));
    }
  });
});

router.get('/detail', (req, res, next) => {
  
  const detailResult = handleGetDetail(req.query.id);
  return detailResult.then(detailData => {
    if(detailData) {
      res.json(new SuccessModel(detailData));
    }
  });
});

router.post('/new', loginCheck, (req, res, next) => {

  req.body.author = req.session.username;
  const newResult = handlePostNew(req.body);
  return newResult.then(newData => {
    if(newData) {
      res.json(new SuccessModel(newData));
    }
  });
});

router.post('/update', loginCheck, (req, res, next) => {

  const updateResult = handlePostUpdate(req.query.id, req.body);
  return updateResult.then(updateData => {
    if(updateData) {
      res.json(new SuccessModel(updateData));
    } else {
      res.json(new ErrorModel('update err'));
    }
  });
});

router.post('/del', loginCheck, (req, res, next) => {

  const author = req.session.username;
  const delResult = handlePostDel(req.query.id, author);
  return delResult.then(delData => {
    if(delData) {
      res.json(new SuccessModel(delData));
    } else {
      res.json(new ErrorModel('del err'));
    }
  });

});

module.exports = router;