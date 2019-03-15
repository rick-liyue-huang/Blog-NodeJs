
// based on interface design we have 'blog' interface
const handleBlogRouter = (req, res) => {

  const method = req.method; 
  // const url = req.url;
  // const path = url.split('?')[0];

  // get blog list
  if(method === 'GET' && req.path === '/api/blog/list') {
    return {
      msg: 'this is get blog list interface'
    }
  }

  // get blog detail
  if(method === 'GET' && req.path === '/api/blog/detail') {
    return {
      msg: 'this is get blog detail interface'
    }
  }

  // create new blog
  if(method === 'POST' && req.path === '/api/blog/new') {
    return {
      msg: 'this is post new blog interface'
    }
  }

  // update blog
  if(method === 'POST' && req.path === '/api/blog/update') {
    return {
      msg: 'this is post update blog interface'
    }
  }

  // delete blog
  if(method === 'POST' && req.path === '/api/blog/del') {
    return {
      msg: 'this is post delete blog interface'
    }
  }
}

module.exports = handleBlogRouter;