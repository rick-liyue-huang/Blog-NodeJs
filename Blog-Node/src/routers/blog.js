
const { SuccessModel, ErrorModel } = require('../model/resModel');
const {
  handleGetList, handleGetDetail,
  handlePostNew, handlePostUpdate, handlePostDel
} = require('../controllers/blog');

const handleBlogRouter = (req, res) => {

  const id = req.query.id;
  let method = req.method;
  method = method.toLowerCase();

  if('get' === method && '/api/blog/list' === req.path) {
    // return {
    //   msg: 'list'
    // }

    const author = req.query.author || '';
    const keyword = req.query.keyword || '';
    /*
    const listData = handleGetList(author, keyword);
    if(listData) {
      return new SuccessModel(blogData);
    }
    */
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
   req.body.author = 'rick';
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
   const author = 'rick';
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