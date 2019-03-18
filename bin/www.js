
// import http from node.js
const http = require('http');
const PORT = 8000;
// deal with server inside logic application
const serverHandler = require('../app');

// create server
const server = http.createServer(serverHandler);
server.listen(PORT, () => {
  console.log(`This server is listening on port ${PORT}`);
});
