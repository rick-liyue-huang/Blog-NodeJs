

/**
 * 初始化路由：根据之前的技术方案的设计做出路由
 * 返回假数据：将路由和数据处理分离，以符合设计原则
 *  */ 


// const serverHandle = (req, res) => {
  
//   res.setHeader('Content-ype', 'application/json');

//   const resData = {
//     name: 'rickhuang',
//     content: 'good',
//     env: process.env.NODE_ENV // dev when run npm run dev
//   };

//   res.end(JSON.stringify(resData));
// };

/**
 * 
 *  */ 

// import querystring
const querystring = require('querystring');

// import blog and user router 
const handleBlogRouter = require('../src/router/blog');
const handleUserRouter = require('../src/router/user');

// deal with post data by promise
const getPostData = (req) => {
  const promise = new Promise((resolve, reject) => {

    if(req.method !== 'POST') {
      resolve({}); // if method is get, return null object
      return
    }
    // if format is not json, return null object
    if(req.headers['content-type'] !== 'application/json') {
      resolve({});
      return
    }

    // will get post data
    let postData = '';
    req.on('data', chunk => {
      postData += chunk.toString();
    });
    req.on('end', () => {
      if(!postData) {
        resolve({});
        return
      }
      // get postData
      resolve(JSON.parse(postData));
    })

  })
  return promise;
}

const serverHandle = (req, res) => {
  res.setHeader('Content-type', 'application/json');

  const url = req.url;
  req.path = url.split('?')[0];

  // compose query
  req.query = querystring.parse(url.split('?')[1]);
  // and will transfer to blog and user router file

  // deal post data
  getPostData(req).then(postData => {

    // put postData in req body
    req.body = postData;

    // deal with blog router
    const blogData = handleBlogRouter(req, res);
    if(blogData) {
      res.end(JSON.stringify(blogData));
      return
    }

    // deal with user router
    const userData = handleUserRouter(req, res);
    if(userData) {
      res.end(JSON.stringify(userData));
      return
    }

    // deal with other router
    res.writeHead(404, {"Content-type": "text/plain"}); // overwrite res.setHeader
    res.write("404 not found\n");
    res.end();

  })
/*
  // deal with blog router
  const blogData = handleBlogRouter(req, res);
  if(blogData) {
    res.end(JSON.stringify(blogData));
    return
  }

  // deal with user router
  const userData = handleUserRouter(req, res);
  if(userData) {
    res.end(JSON.stringify(userData));
    return
  }

  // deal with other router
  res.writeHead(404, {"Content-type": "text/plain"}); // overwrite res.setHeader
  res.write("404 not found\n");
  res.end();
*/  
}

module.exports = serverHandle;


