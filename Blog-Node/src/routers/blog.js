
const { SuccessModel, ErrorModel } = require('../model/resModel');
const { getListHandler, 
  getDetailHandler, 
  postNewHandler,
  postUpdateHandler,
  postDelHandler } = require('../controllers/blog');

const handleBlogRouter = (req, res) => {
  const method = req.method;
  const id = req.query.id;

  // get blog list
  if('GET' === method && '/api/blog/list' === req.path) {
    // return {
    //   msg: 'list'
    // }
    const author = req.query.author || '';
    const keyword = req.query.keyword || '';
    // const listData = getListHandler(author, keyword);
    // return new SuccessModel(listData);
    const listResult = getListHandler(author, keyword);
    return listResult.then(listData => {
      return new SuccessModel(listData);
    });
  }

  // get blog detial
  if('GET' === method && '/api/blog/detail' === req.path) {
    // return {
    //   msg: 'detail'
    // }

    // const detailData = getDetailHandler(id);
    // return new SuccessModel(detailData);

    const detailResult = getDetailHandler(id);
    return detailResult.then(detailData => {
      return new SuccessModel(detailData);
    });
    
  } 

  // post new blog
  if('POST' === method && '/api/blog/new' === req.path) {
    // return {
    //   msg: 'new'
    // }
    // const blogData = req.body;

    // const newData = postNewHandler(req.body);
    // return new SuccessModel(newData);

    req.body.author = 'leo'; //will change after true login
    const newResult = postNewHandler(req.body);
    return newResult.then(newData => {
      return new SuccessModel(newData);
    });

  }

  // post update blog
  if('POST' === method && '/api/blog/update' === req.path) {
    // return {
    //   msg: 'update'
    // }
    // const updateData = postUpdateHandler(id, req.body);
    // if(updateData) {
    //   return new SuccessModel(updateData);
    // } else {
    //   return new ErrorModel('no update');
    // }

    const updateResult = postUpdateHandler(id, req.body);
    return updateResult.then(updateData => {
      if(updateData) {
        return new SuccessModel(updateData);
      } else {
        return new ErrorModel('un update');
      }
    });

  }

  // post delete blog
  if('POST' === method && '/api/blog/del' === req.path) {
    // return {
    //   msg: 'delete'
    // }

    // const delData = postDelHandler(id);
    // if(delData) {
    //   return new SuccessModel(delData);
    // } else {
    //   return new ErrorModel('un deleted');
    // }

    const author = 'rick';
    const delResult = postDelHandler(id, author);
    return delResult.then(delData => {
      if(delData) {
        return new SuccessModel(delData);
      } else {
        return new ErrorModel('un delete');
      }
    });
  }

  
}

module.exports = handleBlogRouter;