
// import controller func
const { getList, getDetail, newBlog, updateBlog, delBlog } = require('../controller/blog');
// import data model
const { SuccessModel, ErrorModel } = require('../model/resModel');

// based on interface design we have 'blog' interface
const handleBlogRouter = (req, res) => {

  const method = req.method; 
  const id = req.query.id;
  // const url = req.url;
  // const path = url.split('?')[0];

  // get blog list
  if(method === 'GET' && req.path === '/api/blog/list') {

    const author = req.query.author || '';
    const keyword = req.query.keyword || '';
    const listData = getList(author, keyword);

    return new SuccessModel(listData);
    // return {
    //   msg: 'this is get blog list interface'
    // }
  }

  // get blog detail
  if(method === 'GET' && req.path === '/api/blog/detail') {

    const detailData = getDetail(id);
    return new SuccessModel(detailData);

    // return {
    //   msg: 'this is get blog detail interface'
    // }
  }

  // create new blog
  if(method === 'POST' && req.path === '/api/blog/new') {

    const blogData = req.body;
    const data = newBlog(blogData);
    return new SuccessModel(data);
    // return {
    //   msg: 'this is post new blog interface'
    // }
  }

  // update blog
  if(method === 'POST' && req.path === '/api/blog/update') {

    const blogData = req.body;
    const result = updateBlog(id, blogData);
    if(result) {
      return new SuccessModel();
    } else {
      return new ErrorModel('update err');
    }
    // return {
    //   msg: 'this is post update blog interface'
    // }
  }

  // delete blog
  if(method === 'POST' && req.path === '/api/blog/del') {

    const blogData = req.body;
    const result = delBlog(id);
    if(result) {
      return new SuccessModel();
    } else {
      return new ErrorModel('del blog err');
    }
    // return {
    //   msg: 'this is post delete blog interface'
    // }
  }
}

module.exports = handleBlogRouter;