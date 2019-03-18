
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
    const listData = getListHandler(author, keyword);
    return new SuccessModel(listData);

    // return {
    //   msg: 'list'
    // }
  }

  if(method === 'GET' && req.path === '/api/blog/detail') {

    const detailData = getDetailHandler(id);
    return new SuccessModel(detailData);

    // return {
    //   msg: 'detail'
    // }
  }

  if(method === 'POST' && req.path === '/api/blog/update') {

    const updateData = req.body;
    const data = updateBlogHandler(id, updateData);
    if(data) {
      return new SuccessModel(data);
    } else {
      return new ErrorModel('update fail');
    }
    

    // return {
    //   msg: 'update'
    // }
  }

  if(method === 'POST' && req.path === '/api/blog/new') {

    const newData = req.body;
    const data = newBlogHandler(newData);
    return new SuccessModel(data);
    
    // return {
    //   msg: 'new'
    // }
  } 

  if(method === 'POST' && req.path === '/api/blog/del') {

    const data = delBlogHandler(id);
    if(data) {
      return new SuccessModel(data);
    } else {
      return new ErrorModel('del fail');
    }
    
    // return {
    //   msg: 'del'
    // }
  }



};

module.exports = blogRouterHandler;