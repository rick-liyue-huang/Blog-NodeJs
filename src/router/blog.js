

// deal with the specail router
const HandleBlogRouter = (req, res) => {

  const method = req.method;
  const id = req.query.id; // req.query get from app.js

  if(method === 'GET' && req.path === '/api/blog/list') {
    return {
      msg: 'list'
    }
  }

  if(method === 'GET' && req.path === '/api/blog/detail') {
    return {
      msg: 'detail'
    }
  }

  if(method === 'POST' && req.path === '/api/blog/new') {
    return {
      msg: 'new'
    }
  }

  if(method === 'POST' && req.path === '/api/blog/update') {
    return {
      msg: 'update'
    }
  }

  if(method === 'POST' && req.path === '/api/blog/del') {
    return {
      msg: 'del'
    }
  }

};

module.exports = HandleBlogRouter;