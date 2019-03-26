
// import model and event on router
const { SuccessModel, ErrorModel } = require('../model/resModel');
const {
  handleGetBlogList,
  handleGetBlogDetail,
  handlePostBlogNew,
  handlePostBlogUpdate,
  handlePostBlogDel
} = require('../controller/blog');

// check login or not
// here req.session.username is parallel with router/user.js, 
// which both are from set promise object
const loginCheck = (req) => {
  if(!req.session.username) {
    return Promise.resolve(
      new ErrorModel('unlogin router-blog.js')
    )
  }
}


// deal with the specail router
const handleBlogRouter = (req, res) => {

  const method = req.method;
  const id = req.query.id; // req.query get from app.js

  if(method === 'GET' && req.path === '/api/blog/list') {

    let author = req.query.author || '';
    const keyword = req.query.keyword || '';

    // confirm whether it is logined or not
    if(req.query.isadmin) {
      const loginResult = loginCheck(req);
      if(loginResult) {
        return loginResult
      }
      
      author = req.session.username;
    }
    
    // get promise
    const listResult = handleGetBlogList(author, keyword);
    return listResult.then(listData => {
      if(listData) {
        // resolve data
        return new SuccessModel(listData);
      } else {
        return new ErrorModel('list fail');
      }
    });

    /* step 2
    const listData = handleGetBlogList(author, keyword);
    if(listData) {
      return new SuccessModel(listData);
    } else {
      return new ErrorModel('list fail');
    }
    */
    // step 1
    // return {
    //   msg: 'list'
    // }
  }

  if(method === 'GET' && req.path === '/api/blog/detail') {

    const detailResult = handleGetBlogDetail(id);
    return detailResult.then(detailData => {
      if(detailData.id) {
        return new SuccessModel(detailData);
      } else {
        return new ErrorModel('detail fail');
      }
    });

    /*
    const detailData = handleGetBlogDetail(id);
    if(detailData) {
      return new SuccessModel(detailData);
    } else {
      return new ErrorModel('detail fail');
    }
    */
    // return {
    //   msg: 'detail'
    // }
  }

  if(method === 'POST' && req.path === '/api/blog/new') {

    const loginResult = loginCheck(req);
    if(loginResult) {
      return loginResult;
    }
    // only new after login
    req.body.author = req.session.username;
    const newResult = handlePostBlogNew(req.body);
    return newResult.then(newData => {
      if(newData) {
        return new SuccessModel(newData);
      } else {
        return new ErrorModel('new fail');
      }
    });

    /*
    const newData = handlePostBlogNew(req.body);
    if(newData) {
      return new SuccessModel(newData);
    } else {
      return new ErrorModel('new fail');
    }
    */
    // return {
    //   msg: 'new'
    // }
  }

  if(method === 'POST' && req.path === '/api/blog/update') {
    
    const loginResult = loginCheck(req);
    if(loginResult) {
      return loginResult;
    }
    // only update after login
    // return promise object
    const updateResult = handlePostBlogUpdate(id, req.body);
    return updateResult.then(updateData => {
      if(updateData) {
        return new SuccessModel(updateData);
      } else {
        return new ErrorModel('update fail');
      }
    });

    /*
    const updateData = handlePostBlogUpdate(id, req.body);
    if(updateData) {
      return new SuccessModel(updateData);
    } else {
      return new ErrorModel('update fail');
    }
    */
    // return {
    //   msg: 'update'
    // }
  }

  if(method === 'POST' && req.path === '/api/blog/del') {
    
    const loginResult = loginCheck(req);
    if(loginResult) {
      return loginResult;
    }
    // only delete after login
    const author = req.session.username;
    const delResult = handlePostBlogDel(id, author);
    return delResult.then(delData => {
      if(delData) {
        return new SuccessModel(delData);
      } else {
        return new ErrorModel('del fail');
      }
    });

    /*
    const delData = handlePostBlogDel(id);
    if(delData) {
      return new SuccessModel(delData);
    } else {
      return new ErrorModel('del fail');
    }
    */
    // return {
    //   msg: 'del'
    // }
  }

};

module.exports = handleBlogRouter;