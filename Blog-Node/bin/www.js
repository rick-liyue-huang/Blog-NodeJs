
// create server
const http = require('http');
const querystring = require('querystring');
const serverHandler = require('../app');
const PORT = 8000;

const server = http.createServer(serverHandler);

server.listen(PORT, () => {
  console.log(`listen on port of ${PORT}`);
});