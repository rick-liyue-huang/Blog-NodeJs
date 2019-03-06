
// const http = require('http');
// const querystring = require('querystring');

// const server = http.createServer((req, res) => {
// 	console.log('method: ', req.method);
// 	const url = req.url;
// 	console.log('url: ', url);
//  const path = url.split('?')[0];
//  console.log('path: ', path);
// 	req.query = querystring.parse(url.split('?')[1]);
// 	console.log('query: ', req.query);

// 	res.end(JSON.stringify(req.query));
// });

// server.listen(8000);
// console.log('ok');

// const http = require('http');

// const server = http.createServer((req, res) => {

//   if(req.method === 'POST') {
//     console.log('req content-type: ', req.headers['content-type']);

//     let postData = '';
//     req.on('data', chunk => {
//       postData += chunk.toString();
//     });

//     req.on('end', () => {
//       console.log('postData: ', postData);
//       res.end('hello world');
//     })
//   } 
// });

// server.listen(8000);
// console.log('ok');

const http = require('http');
const querystring = require('querystring');

const server = http.createServer((req, res) => {

  const method = req.method;
  const url = req.url;
  const path = url.split('?')[0];
  const query = querystring.parse(url.split('?')[1]);

  // set res type as JSON
  res.setHeader('Content-type', 'application/json');

  // define res data
  const resData = {
    method,
    url,
    path,
    query
  };
  if(method === 'GET') {
    res.end(JSON.stringify(resData));
  }
  if(method === 'POST') {
    let postData = '';
    req.on('data', chunk => {
      postData += chunk.toString();
    })

    req.on('end', () => {
      resData.postData = postData;
      res.end(JSON.stringify(resData));
    })
  }
});

server.listen(8000);