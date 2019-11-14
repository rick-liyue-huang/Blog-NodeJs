
const express = require('express');
const router = express.Router();
const { SuccessModel, ErrorModel } = require('../model/resModel');
const { getListHandler,
  getDetailHandler,
  postNewHandler,
  postUpdateHandler,
  postDelHandler, } = require('../controllers/blog');
const loginCheck = require('../middlewares/loginCheck');

router.get('/list', (req, res, next) => {
  let author = req.query.author || '';
  const keyword = req.query.keyword || '';

  if(req.query.isadmin) {
    // admin page

    console.log('is admin');
    
    if(null == req.session.username) {
      // unlogin
      console.error('is admin but not login');
      res.json(new ErrorModel('unlogin - blog'));
      return
    }
    // otherwise 
    author = req.session.username;
  }

  const listResult = getListHandler(author, keyword);
  return listResult.then(listData => {
    res.json(new SuccessModel(listData));
  });
});


router.get('/detail', (req, res, next) => {
  const detailResult = getDetailHandler(req.query.id);
  return detailResult.then(detailData => {
    res.json(new SuccessModel(detailData)); 
  });
});

router.post('/new', loginCheck, (req, res, next) => {
  req.body.author = req.session.username;
  const newResult = postNewHandler(req.body);
  return newResult.then(newData => {
    res.json(new SuccessModel(newData));
  });
});

router.post('/update', loginCheck, (req, res, next) => {
  const updateResult = postUpdateHandler(req.query.id, req.body);
  return updateResult.then(updateData => {
    if(updateData) {
      res.json(new SuccessModel(updateData));
    } else {
      res.json(new ErrorModel('un update'));
    }
  });
});

router.post('/del', loginCheck, (req, res, next) => {
  const author = req.session.username;
  const delResult = postDelHandler(req.query.id, author);
  return delResult.then(delData => {
    if(delData) {
      res.json(new SuccessModel(delData));
    } else {
      res.json(new ErrorModel('un update'));
    }
  });
})

module.exports = router;