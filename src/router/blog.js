
// import model and event on router
const { SuccessModel, ErrorModel } = require('../model/resModel');
const {
  handleGetBlogList,
  handleGetBlogDetail,
  handlePostBlogNew,
  handlePostBlogUpdate,
  handlePostBlogDel
} = require('../controller/blog');

// deal with the specail router
const HandleBlogRouter = (req, res) => {

  const method = req.method;
  const id = req.query.id; // req.query get from app.js

  if(method === 'GET' && req.path === '/api/blog/list') {

    const author = req.query.author || '';
    const keyword = req.query.keyword || '';
    const listData = handleGetBlogList(author, keyword);
    if(listData) {
      return new SuccessModel(listData);
    } else {
      return new ErrorModel('list fail');
    }

    // step 1
    // return {
    //   msg: 'list'
    // }
  }

  if(method === 'GET' && req.path === '/api/blog/detail') {
    
    const detailData = handleGetBlogDetail(id);
    if(detailData) {
      return new SuccessModel(detailData);
    } else {
      return new ErrorModel('detail fail');
    }

    // return {
    //   msg: 'detail'
    // }
  }

  if(method === 'POST' && req.path === '/api/blog/new') {

    const newData = handlePostBlogNew(req.body);
    if(newData) {
      return new SuccessModel(newData);
    } else {
      return new ErrorModel('new fail');
    }

    // return {
    //   msg: 'new'
    // }
  }

  if(method === 'POST' && req.path === '/api/blog/update') {
    
    const updateData = handlePostBlogUpdate(id, req.body);
    if(updateData) {
      return new SuccessModel(updateData);
    } else {
      return new ErrorModel('update fail');
    }
    // return {
    //   msg: 'update'
    // }
  }

  if(method === 'POST' && req.path === '/api/blog/del') {
    
    const delData = handlePostBlogDel(id);
    if(delData) {
      return new SuccessModel(delData);
    } else {
      return new ErrorModel('del fail');
    }

    // return {
    //   msg: 'del'
    // }
  }

};

module.exports = HandleBlogRouter;