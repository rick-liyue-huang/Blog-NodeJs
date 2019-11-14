
const { SuccessModel, ErrorModel } = require('../model/resModel');
const { getListHandler, 
  getDetailHandler, 
  postNewHandler,
  postUpdateHandler,
  postDelHandler } = require('../controllers/blog');

// veryfy the login check
const loginCheck = (req) => {
  if(!req.session.username) {
    return Promise.resolve(new ErrorModel('unlogin'));
  } 
}

const handleBlogRouter = (req, res) => {
  const method = req.method;
  const id = req.query.id;

  // get blog list
  if('GET' === method && '/api/blog/list' === req.path) {
    // return {
    //   msg: 'list'
    // }
    let author = req.query.author || '';
    const keyword = req.query.keyword || '';
    // const listData = getListHandler(author, keyword);
    // return new SuccessModel(listData);

    if(req.query.isadmin) {
      // admin page
      const loginCheckResult = loginCheck(req);
      if(loginCheckResult) {
        // unlogin
        return loginCheckResult;
      }
      author = req.session.username;
    }

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

    const loginCheckResult = loginCheck(req);
    if(loginCheckResult) {
      // unlogin
      return loginCheckResult;
    }

    // req.body.author = 'leo'; //will change after true login
    req.body.author = req.session.username;
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

    const loginCheckResult = loginCheck(req);
    if(loginCheckResult) {
      // unlogin
      return loginCheckResult;
    }

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

    const loginCheckResult = loginCheck(req);
    if(loginCheckResult) {
      // unlogin
      return loginCheckResult;
    }

    // const author = 'rick';
    const author = req.session.username;
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