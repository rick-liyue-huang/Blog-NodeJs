
// --- 10. using staticServer ---- 
const http = require('http');
const path = require('path');
const readFile = require('./staticServer');

const server = http.createServer();
server.on('request', (req, res) => {
  // readFile(req, res);
  let rootPath = path.join(__dirname, 'www');
  readFile(req, res, rootPath);
})
server.listen(3000);

