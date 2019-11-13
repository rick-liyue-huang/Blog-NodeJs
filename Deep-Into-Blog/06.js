
// ---- 9. about http server

const http = require('http');
const path = require('path');
let fs = require('fs');
let mime = require('./mime.json');

/*

// create one server
const server = http.createServer();

// listen request method
server.on('request', (req, res) => {
  res.writeHead(200, {"Content-Type": "text/plain; charset=utf-8"})
  res.end('www.rick.com');
});

// listen port
server.listen(3000);

*/


// create static file
http.createServer((req, res) => {
  // console.log(req.url);
  if(req.url.startsWith('/index')) {
    // res.end('home');
    // let filePath = path.join(__dirname, 'www', 'index.html');
    /*
    let filePath = path.join(__dirname, 'www', req.url);
    fs.readFile(filePath, 'utf8', (err, data) => {
      if(err) {
        res.end('server error');
      } 
      res.end(data);
    })
    return
    */
    readFile(req, res);

  } else if(req.url.startsWith('/login')) {
    // res.end('login');
    /*
    let filePath = path.join(__dirname, 'www', req.url);
    fs.readFile(filePath, 'utf8', (err, content) => {
      if(err) {
        res.end('server error');
      }
      res.end(content);
    })
    return
    */
    
    readFile(req, res);

  } else {
    readFile(req, res)
  }
  
}).listen(3000);

function readFile(req, res) {
  let filePath = path.join(__dirname, 'www', req.url);
  let extName = path.extname(filePath);
  // console.log(mime[extName])
  let type = mime[extName];
  if(type.startsWith('text')) {
    type += '; charset=utf-8';
  }
  res.writeHead(200, {"Content-Type": type})
  fs.readFile(filePath, (err, data) => {
    if(err) {
      res.end('server error');
    } 
    res.end(data);
  })
  
}