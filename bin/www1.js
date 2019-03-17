
/**
 *  create one server by pure node.js in one file.
 *  */ 

//  import http to create webserver
const http = require('http');
// import querystring to deal with string parse
const querystring = require('querystring');
const PORT = 8000;

// create server
const server = http.createServer((req, res) => {

  // set response format, here use json, also can set as 'text/html'
  res.setHeader('content-type', 'application/json');

  // request method
  const method = req.method;
  // request url
  const url = req.url;
  // request path
  const path = url.split('?')[0];
  // request query
  const query = querystring.parse(url.split('?')[1]);

  const result = {
    method,
    url,
    path,
    query
  };

  // if method is 'GET'
  if(method === 'GET') {
    // show result on browser
    res.end(JSON.stringify(result));
  }
  // method is 'POST'
  else if(method === 'POST') {

    let postData = '';

    req.on('data', chunk => {
      // transfer data to post DATA
      postData += chunk.toString();
    });

    // finish transfer
    req.on('end', () => {
      result.postData = postData;
      res.end(JSON.stringify(result));
    });
  }

});

server.listen(PORT, () => {
  console.log(`server is listening... on port ${PORT}. `);
});





