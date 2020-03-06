// 这是server文件
const http = require("http");
const PORT = 8000;
// 引入的具体创建server的方法
const serverHandler = require("../app");

const server = http.createServer(serverHandler);
server.listen(8000);
