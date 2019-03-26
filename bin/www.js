
// server entry file
const http = require('http');
const PORT = 8000;
// import server logic application
const serverHandler = require('../app');
// create server
const server = http.createServer(serverHandler);
server.listen(PORT, () => {
  console.log(`This server is listening on port ${PORT}`);
});
