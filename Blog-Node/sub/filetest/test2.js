
// stream 1:
// process.stdin.pipe(process.stdout);

// stream 2:
// const http = require('http');

// http.createServer((req, res) => {
//   if(req.method === 'POST') {
//     req.pipe(res);
//   }
// }).listen(3000);

// stream 3:
/*
const fs = require('fs');
const path = require('path');

const filename1 = path.resolve(__dirname, 'data.txt');
const filename2 = path.resolve(__dirname, 'bak.txt');

const readStream = fs.createReadStream(filename1);
const writeStream = fs.createWriteStream(filename2);

readStream.pipe(writeStream); // readstream pipe to writestream

readStream.on('data', chunk => {
  console.log(chunk.toString());
});

readStream.on('end', () => {
  console.log('copy done');
});
*/

// stream 4:

const http = require('http');
const fs = require('fs');
const path = require('path');

const filename = path.resolve(__dirname, 'data.txt');

http.createServer((req, res) => {
  if(req.method === 'GET') {
    const readstream = fs.createReadStream(filename);
    readstream.pipe(res);
  }
}).listen(3000);



