// const http = require("http");
// const server = http.createServer((req, res) => {
//   if (req.method === "POST") {
//     req.pipe(res);
//   }
// });

// server.listen(3000);

const fs = require("fs");
const path = require("path");

const filename1 = path.resolve(__dirname, "data.txt");
const filename2 = path.resolve(__dirname, "data1.txt");
const readstream = fs.createReadStream(filename1);
const wrietestream = fs.createWriteStream(filename2);

// 用来创建stream数据，然后通过pipe处理两种流之间联系
readstream.pipe(wrietestream);

readstream.on("data", chunk => {
  console.log(chunk.toString());
});
readstream.on("end", () => {
  console.log("copy done");
});

const http = require("http");
// const fs = require("fs");
// const path = require("path");

const filename = path.resolve(__dirname, "data.txt");
const server = http.createServer((req, res) => {
  if (req.method === "GET") {
    const readstream = fs.createReadStream(filename);
    readstream.pipe(res);
  }
});
server.listen(3000);
