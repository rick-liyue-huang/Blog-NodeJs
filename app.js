

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

// import blog and user router 
const handleBlogRouter = require('./src/router/blog');
const handleUserRouter = require('./src/router/user');

const serverHandle = (req, res) => {
  res.setHeader('Content-type', 'application/json');

  const url = req.url;
  req.path = url.split('?')[0];

  // deal with blog router
  const blogData = handleBlogRouter(req, res);
  if(blogData) {
    res.end(JSON.stringify(blogData));
    // res.end(JSON.stringify({
    //   errno: 0,
    //   data: {...},
    //   message: 'xxx'
    // }))
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
}

module.exports = serverHandle;