
// simple server 

const http = require('http');
const querystring = require('querystring');

const server = http.createServer((req, res) => {

  const method = req.method;
  const url = req.url;
  const path = url.split('?')[0];
  const query = querystring.parse(url.split('?')[1]);

  res.setHeader('Content-type', 'application/json');

  const resData = {
    method,
    url,
    path,
    query
  };

  if('GET' === method) {
    res.end(JSON.stringify(resData));
  }
  if('POST' === method) {
    let postData = '';
    req.on('data', chunk => {
      postData += chunk.toString();
    });
    req.on('end', () => {
      resData.postData = postData;
      res.end(JSON.stringify(resData));
    });
  }
});

server.listen(3000, () => {
  console.log(3000);
});

