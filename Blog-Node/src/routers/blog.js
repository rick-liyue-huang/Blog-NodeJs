
const { SuccessModel, ErrorModel } = require('../model/resModel');
const { getListHandler, getDetailHandler } = require('../controllers/blog');

const handleBlogRouter = (req, res) => {
  const method = req.method;

  // get blog list
  if('GET' === method && '/api/blog/list' === req.path) {
    // return {
    //   msg: 'list'
    // }
    const author = req.query.author || '';
    const keyword = req.query.keyword || '';
    const listData = getListHandler(author, keyword);
    return new SuccessModel(listData);
  }

  // get blog detial
  if('GET' === method && '/api/blog/detail' === req.path) {
    // return {
    //   msg: 'detail'
    // }

    const id = req.query.id;
    const detailData = getDetailHandler(id);
    return new SuccessModel(detailData);
    
  } 

  // post new blog
  if('POST' === method && '/api/blog/new' === req.path) {
    return {
      msg: 'new'
    }
  }

  // post update blog
  if('POST' === method && '/api/blog/update' === req.path) {
    return {
      msg: 'update'
    }
  }

  // post delete blog
  if('POST' === method && '/api/blog/del' === req.path) {
    return {
      msg: 'delete'
    }
  }
}

module.exports = handleBlogRouter;