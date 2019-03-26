
const querystring = require('querystring');
// import funcs to deal with router
const handleBlogRouter = require('./src/router/blog');
const handleUserRouter = require('./src/router/user');

// seperate one func to deal with 'POST' method
const handlePostData = (req) => {
  const promise = new Promise((resolve, reject) => {
    // if it is NOT POST method
    if(req.method !== 'POST') {
      resolve({});
      return
    }
    // if data format is wrong
    if(req.headers['content-type'] !== 'application/json') {
      resolve({});
      return
    }

    let postData = '';
    req.on('data', chunk => {
      postData += chunk.toString(); // binary data to string
    });
    req.on('end', () => {
      if(postData == null) {
        resolve({});
        return
      }
      resolve(JSON.parse(postData));
    });

  });
  return promise;
}

// deal with server logic application
const serverHandler = (req, res) => {

  res.setHeader('content-type', 'application/json');
  // get url para
  let url = req.url;
  req.path = url.split('?')[0];
  req.query = querystring.parse(url.split('?')[1]);

  // get postData
  handlePostData(req).then(postData => {
    req.body = postData;

    // deal with router
    /*
    const blogData = HandleBlogRouter(req, res);
    if(blogData) {
      res.end(JSON.stringify(blogData));
      return
    }
    */
  //  get promise object
    const blogResult = handleBlogRouter(req, res);
    if(blogResult) {
      blogResult.then(blogData => {  // deal with resolve data
        res.end(JSON.stringify(blogData));
      });
      return
    }

    /*
    const userData = handleUserRouter(req, res);
    if(userData) {
      res.end(JSON.stringify(userData));
      return
    }
    */

    // get promise result
    const userResult = handleUserRouter(req, res);
    if(userResult) {
      userResult.then(userData => {
        res.end(JSON.stringify(userData));
      });
      return
    }
    // deal with other router
    res.writeHead('404', {'Content-type': 'text/plain'});
    res.end('404 Not Found app.js \n');
  });
};

module.exports = serverHandler;