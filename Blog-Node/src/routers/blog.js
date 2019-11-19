
const { SuccessModel, ErrorModel } = require('../model/resModel');
const {
  handleGetList, handleGetDetail,
  handlePostNew, handlePostUpdate, handlePostDel
} = require('../controllers/blog');

function loginCheck(req) {
  if(!req.session.username) {
    return Promise.resolve(new ErrorModel('unlogin -- logincheck'))
  }
}

const handleBlogRouter = (req, res) => {

  const id = req.query.id;
  let method = req.method;
  method = method.toLowerCase();

  if('get' === method && '/api/blog/list' === req.path) {
    // return {
    //   msg: 'list'
    // }

    let author = req.query.author || '';
    const keyword = req.query.keyword || '';
    /*
    const listData = handleGetList(author, keyword);
    if(listData) {
      return new SuccessModel(blogData);
    }
    */

   if(req.query.isadmin) {
      const loginCheckResult = loginCheck(req);
      if(loginCheckResult) {
        return loginCheckResult;
      }
      author = req.session.username;
   }
    
   const listResult = handleGetList(author, keyword);
   console.log('listResult: ', listResult);
   return listResult.then(listData => {
     console.log('listData: ', listData);
     if(listData) {
       return new SuccessModel(listData);
     }
   });
  } 

  if('get' === method && '/api/blog/detail' === req.path) {
    // return {
    //   msg: 'detail'
    // }
    /*
    const detailData = handleGetDetail(id);
    if(detailData) {
      return new SuccessModel(detailData);
    }
    */
   const detailResult = handleGetDetail(id);
   return detailResult.then(detailData => {
     if(detailData) {
       return new SuccessModel(detailData);
     }
   });
  } 

  if('post' === method && '/api/blog/new' === req.path) {
    // return {
    //   msg: 'new'
    // }
    /*
    const newData = handlePostNew(req.body);
    if(newData) {
      return new SuccessModel(newData);
    }
    */

   const loginCheckResult = loginCheck(req);
   if(loginCheckResult) {
     return loginCheckResult;
   }
  
  //  req.body.author = 'rick';
   req.body.author = req.session.username;
   const newResult = handlePostNew(req.body);
   return newResult.then(newData => {
     if(newData) {
       return new SuccessModel(newData);
     }
   });
  } 

  if('post' === method && '/api/blog/update' === req.path) {
    // return {
    //   msg: 'update'
    // }
    /*
    const updateData = handlePostUpdate(id, req.body);
    if(updateData) {
      return new SuccessModel(updateData);
    } else {
      return new ErrorModel('un update');
    }
    */
   const loginCheckResult = loginCheck(req);
   if(loginCheckResult) {
     return loginCheckResult;
   }

   const updateResult = handlePostUpdate(id, req.body);
   return updateResult.then(updateData => {
     if(updateData) {
       return new SuccessModel(updateData);
     } else {
       return new ErrorModel('update err');
     }
   });
  } 

  if('post' === method && '/api/blog/del' === req.path) {
    // return {
    //   msg: 'del'
    // }
    /*
    const delData = handlePostDel(id);
    if(delData) {
      return new SuccessModel(delData);
    } else {
      return new ErrorModel('un delete');
    }
    */
   const loginCheckResult = loginCheck(req);
   if(loginCheckResult) {
     return loginCheckResult;
   }

  //  const author = 'rick';
   const author = req.session.username;
   const delResult = handlePostDel(id, author);
   return delResult.then(delData => {
     if(delData) {
       return new SuccessModel(delData);
     } else {
       return new ErrorModel('del err');
     }
   })
  } 
}

module.exports = handleBlogRouter;