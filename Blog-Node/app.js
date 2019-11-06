
const querystring = require('querystring');
const handleBlogRouter = require('./src/routers/blog');
const handleUserRouter = require('./src/routers/user');

const getPostDataHandler = (req) => {
  const promise = new Promise((resolve, reject) => {
    if('POST' !== req.method) {
      resolve({});
      return;
    }
    if('application/json' !== req.headers['content-type']) {
      resolve({});
      return;
    }
    let postData = '';
    req.on('data', chunk => {
      postData += chunk.toString();
    });
    req.on('end', () => {
      if(!postData) {
        resolve({});
        return;
      }
      resolve(JSON.parse(postData));
    })
  });

  return promise;
}

const serverHandler = (req, res) => {
  // set response type
  res.setHeader('Content-type', 'application/json');

  const url = req.url;
  req.path = url.split('?')[0];
  req.query = querystring.parse(url.split('?')[1]);

  // deal with postdata
  getPostDataHandler(req).then(postData => {
    req.body = postData;

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

  });
  
}

module.exports = serverHandler;

// env: process.env.NODE_ENV,