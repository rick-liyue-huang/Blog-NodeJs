
const fs = require('fs');
const path = require('path');
const mime = require('./mime.json');

function readFile(req, res, rootPath) {
  let filePath = path.join(rootPath, req.url);
  let extName = path.extname(filePath);
  // console.log(mime[extName])
  let type = mime[extName];
  if(type.startsWith('text')) {
    type += '; charset=utf-8;';
  }
  res.writeHead(200, {"Content-Type": type})
  fs.readFile(filePath, (err, data) => {
    if(err) {
      res.end('server error');
    } 
    res.end(data);
  })
  
}

module.exports = readFile;