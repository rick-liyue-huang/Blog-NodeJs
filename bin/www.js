
const http = require('http');
const path = require('path');
const querystring = require('querystring');

// req === request,  res === response
/**
 * get 请求，即客户端向server端获取数据，如查询博客列表
 * 通过querystring来传递数据， such as a.html?a=100&b=200
 * 浏览器直接访问就发送get请求
  */ 

/**
 * post 请求，即客户端要向服务端传送信息，如新建博客
 * 通过post data传送数据
 * 浏览器无法直接模拟，需要手写js，或者postman
 *  */  

// const server = http.createServer((req, res) => {
//   console.log('method: ',req.method);
//   const url = req.url;
//   console.log('url: ', url);
//   console.log('path: ', req.path);
//   req.query = querystring.parse(url.split('?')[1]);
//   console.log('query: ', req.query);
//   res.end(JSON.stringify(req.query));
// });

// const server = http.createServer((req, res) => {
//   if(req.method === 'POST') {
//     // postman can select content-type as application/json
//     console.log('content-type', req.headers['content-type']);

//     // set initial postData
//     let postData = '';
//     // trigger 'data' event when post data to server
//     req.on('data', chunk => {
//       postData += chunk.toString();
//     });
//     // trigger 'end' event when finish posting data.
//     req.on('end', () => {
//       console.log(postData);
//       console.log('req.url: ', req.url);
//       req.query = querystring.parse(req.url.split('?')[1]);
//       console.log('req.query: ', req.query);
//       res.end('hello world');
//     })
//   }
// });

// const server = http.createServer((req, res) => {
//   const method = req.method;
//   const url = req.url;
//   const path = url.split('?')[0];
//   const query = querystring.parse(url.split('?')[1]);

//   // set response format as json
//   res.setHeader('Content-type', 'application/json');

//   // response data
//   const resData = {
//     method,
//     url,
//     path,
//     query
//   };

//   if(method === 'GET') {
//     res.end(JSON.stringify(resData));
//   } else if(method === 'POST') {
//     let postData = '';

//     req.on('data', chunk => {
//       postData += chunk.toString();
//     });
//     req.on('end', () => {
//       resData.postData = postData;
//       res.end(JSON.stringify(resData));
//     })
//   }
// })


// server.listen(3000, () => {
//   console.log('good');
// });


// set up server

const PORT = 8000;
const serverHandle = require('../app');

const server = http.createServer(serverHandle);

server.listen(PORT, () => {
  console.log('begin..');
})