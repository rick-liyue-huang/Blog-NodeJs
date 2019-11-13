
// ---- 5.copy file by readstream and writestream ---

const fs = require('fs');
const path = require('path');

// create read path and write path
let readPath = path.join(__dirname, 'data.txt');
let writePath = path.join(__dirname, 'bak.txt');

// create read stream
let readStream = fs.createReadStream(readPath);
// create write stream
let writeStream = fs.createWriteStream(writePath);

/*
// listen read stream
readStream.on('open', () => {
  console.log('read open');
});
readStream.on('error', err => {
  console.log(err);
});
readStream.on('data', data => {
  // console.log(data);
  writeStream.write(data);
});
readStream.on('close', () => {
  console.log('read close');
  writeStream.end();
});

// listen write stream
writeStream.on('open', () => {
  console.log('write open');
});
writeStream.on('error', err => {
  console.log(err);
});
writeStream.on('close', () => {
  console.log('write close');
});

*/

// --- 6. by pipe -----
readStream.pipe(writeStream);


