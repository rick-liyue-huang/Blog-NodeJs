
const querystring = require('querystring');
const handleBlogRouter = require('./src/routers/blog');
const handleUserRouter = require('./src/routers/user');

const postDataHandler = (req) => {
  const promise = new Promise((resolve, reject) => {
    if('POST' !== req.method) {
      resolve({});
      return
    }
    if('application/json' !== req.headers['content-type']) {
      resolve({});
      return
    }
    let postData = '';
    req.on('data', chunk => {
      postData += chunk.toString();
    });
    req.on('end', () => {
      if(!postData) {
        resolve({});
        return
      }
      resolve(JSON.parse(postData));
    });
  });
  return promise;
}


const serverHandler = (req, res) => {

  res.setHeader('Content-Type', 'application/json');

  const url = req.url;
  req.path = url.split('?')[0];
  req.query = querystring.parse(url.split('?')[1]);

  postDataHandler(req).then(postData => {

    req.body = postData;

    const blogData = handleBlogRouter(req, res);
    if(blogData) {
      res.end(JSON.stringify(blogData));
      return
    }

    const userData = handleUserRouter(req, res);
    if(userData) {
      res.end(JSON.stringify(userData));
      return
    }

    res.writeHead('404', {"Content-Type": "text/plain"});
    res.end('404 not found');

  });
  
}

module.exports = serverHandler;










/*
  if(method === 'GET') {
    res.end(JSON.stringify({
      method,
      url,
      path,
      query,
      env
    }));
  }

  if(method === 'POST') {
    let postData = '';
    req.on('data', chunk => {
      postData += chunk.toString();
    });
    req.on('end', () => {
      if(!postData) {
        return
      }
      res.end(JSON.stringify({
        postData,
        type: req.headers['content-type']
      }));
    });
  }

  */