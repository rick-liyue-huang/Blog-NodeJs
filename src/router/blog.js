
const {
  SuccessModel,
  ErrorModel
} = require('../model/resModel');

const {
  getBlogListHandler,
  getBlogDetailHandler,
  postBlogNewHandler,
  postBlogUpdateHandler,
  postBlogDelHandler
} = require('../controller/blog');

const blogRouterHandler = (req, res) => {

  const method = req.method;
  const id = req.query.id;

  if(method === 'GET' && req.path === '/api/blog/list') {

    const author = req.query.author || '';
    const keyword = req.query.keyword || '';

    const listResult = getBlogListHandler(author, keyword);
    // listResult is promise object
    return listResult.then(listData => {
      if(listData) {
        return new SuccessModel(listData);
      }
    });
    /*
    const author = req.query.author || '';
    const keyword = req.query.keyword || '';
    const listData = getBlogListHandler(author, keyword);
    if(listData) {
      return new SuccessModel(listData);
    }
    return new ErrorModel('list fail');
    */

    /*
    return {
      msg: 'list'
    }
    */
  }

  if(method === 'GET' && req.path === '/api/blog/detail') {
    
    const detailResult = getBlogDetailHandler(id);
    return detailResult.then(detailData => {
      return new SuccessModel(detailData);
    });
    /*
    const detailData = getBlogDetailHandler(id);
    if(detailData) {
      return new SuccessModel(detailData);
    }
    return new ErrorModel('detail fail');
    */

    /*
    return {
      msg: 'detail'
    }
    */
  }

  if(method === 'POST' && req.path === '/api/blog/new') {
    
    req.body.author = 'newauthor'; // fake author
    const newResult = postBlogNewHandler(req.body);
    return newResult.then(newData => {
      return new SuccessModel(newData);
    });


    /*
    const newData = postBlogNewHandler(req.body);
    if(newData) {
      return new SuccessModel(newData);
    } else {
      return new ErrorModel('new fail');
    }
    */


    /*
    return {
      msg: 'new'
    }
    */
  }

  if(method === 'POST' && req.path === '/api/blog/update') {
    
    const updateResult = postBlogUpdateHandler(id, req.body);
    return updateResult.then(updateData => {
      if(updateData) {
        return new SuccessModel(updateData);
      } else {
        return new ErrorModel('update fail');
      }
    });

    /*
    const updateData = postBlogUpdateHandler(id, req.body);
    if(updateData) {
      return new SuccessModel(updateData);
    } else {
      return new ErrorModel('update fail');
    }
    */

    /*
    return {
      msg: 'update'
    }
    */
  }

  if(method === 'POST' && req.path === '/api/blog/del') {

    const author = 'rick';
    const delResult = postBlogDelHandler(id, author);
    return delResult.then(delData => {
      if(delData) {
        return new SuccessModel();
      } else {
        return new ErrorModel('delet fail');
      }
    });

    /*
    const delData = postBlogDelHandler(id);
    if(delData) {
      return new SuccessModel(delData);
    } else {
      return new ErrorModel('del fail');
    }
    */

    /*
    return {
      msg: 'del'
    }
    */
  }
};

module.exports = blogRouterHandler;