
const querystring = require('querystring');
const handleBlogRouter = require('./src/routers/blog');
const handleUserRouter = require('./src/routers/user');

const serverHandler = (req, res) => {

  const url = req.url;
  req.path = url.split('?')[0];
  req.query = querystring.parse(url.split('?')[1]);

  // set response type
  res.setHeader('Content-type', 'application/json');

  // deal with blog router
  const blogData = handleBlogRouter(req, res);
  if(blogData) {
    res.end(JSON.stringify(blogData));
    return;
  }

  // deal with user router
  const userData = handleUserRouter(req, res);
  if(userData) {
    res.end(JSON.stringify(userData));
    return;
  }

  // deal with 404
  res.writeHead(404, {"content-type": 'text/plain'});
  res.end('404 Not Found\n');
}

module.exports = serverHandler;

// env: process.env.NODE_ENV,