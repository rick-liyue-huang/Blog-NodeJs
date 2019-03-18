
const {
  SuccessModel,
  ErrorModel
} = require('../model/resModel');

const {
  getListHandler,
  getDetailHandler,
  newBlogHandler,
  updateBlogHandler,
  delBlogHandler
} = require('../controller/blog');



const blogRouterHandler = (req, res) => {

  const method = req.method;
  const id = req.query.id;

  if(method === 'GET' && req.path === '/api/blog/list') {

    const author = req.query.author || '';
    const keyword = req.query.keyword || '';
    // const listData = getListHandler(author, keyword);
    // return new SuccessModel(listData);

    // return promise
    const listResult = getListHandler(author, keyword);
    return listResult.then(listdata => {
      return new SuccessModel(listdata);
    });

    // return {
    //   msg: 'list'
    // }
  }

  if(method === 'GET' && req.path === '/api/blog/detail') {

    const detailResult = getDetailHandler(id);
    return detailResult.then(detailData => {
      return new SuccessModel(detailData);
    });

    // const detailData = getDetailHandler(id);
    // return new SuccessModel(detailData);

    // return {
    //   msg: 'detail'
    // }
  }

  if(method === 'POST' && req.path === '/api/blog/update') {

    // result is promise
    const result = updateBlogHandler(id, req.body);
    return result.then(val => {
      if(val) {
        return new SuccessModel()
      } else {
        return ErrorModel('update fail');
      }
    })

    // const updateData = req.body;
    // const data = updateBlogHandler(id, updateData);
    // if(data) {
    //   return new SuccessModel(data);
    // } else {
    //   return new ErrorModel('update fail');
    // }
    

    // return {
    //   msg: 'update'
    // }
  }

  if(method === 'POST' && req.path === '/api/blog/new') {

    // use fake author
    // req.body.author = 'author';
    const newResult = newBlogHandler(req.body);
    return newResult.then(data => {
      return new SuccessModel(data);
    });

    // const newData = req.body;
    // const data = newBlogHandler(newData);
    // return new SuccessModel(data);
    
    // return {
    //   msg: 'new'
    // }
  } 

  if(method === 'POST' && req.path === '/api/blog/del') {

    const author = 'rick';
    const delResult = delBlogHandler(id, author);
    return delResult.then(val => {
      if(val) {
        return new SuccessModel()
      } else {
        return new ErrorModel('del fail');
      }
    });

    // const data = delBlogHandler(id);
    // if(data) {
    //   return new SuccessModel(data);
    // } else {
    //   return new ErrorModel('del fail');
    // }
    
    // return {
    //   msg: 'del'
    // }
  }



};

module.exports = blogRouterHandler;