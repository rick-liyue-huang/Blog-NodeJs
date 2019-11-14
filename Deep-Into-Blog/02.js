
// ---- 4. about file -----
const fs = require('fs');
const path = require('path');

fs.stat(__filename, (err, stats) => {
  if(stats.isFile()) {
    console.log('is file')
  } else if(stats.isDirectory()) {
    console.log('is dedectory');
  }
  
});

let str = path.join(__dirname, '../', 'README.md');
fs.readFile(str, 'utf8', (err, data) => {
  if(err) {
    console.log(err);
  }
  // console.log(data.toString());
  console.log(data);
});

str = path.join(__dirname, 'data.txt');
let buf = Buffer.from('new deep into node.js');
fs.writeFile(str, buf, 'utf8', (err) => {
  if(err) {
    console.log(err);
  }
  console.log('done');
});

// append file
fs.appendFile(str, '\ngood ok', 'utf8', (err) => {
  if(err) {
    console.log(err);
  }
  console.log('done');
});

// read and write by stream

// create read stream
let readStream = fs.createReadStream(str, {encoding: 'utf8', highWaterMark: 1});
readStream.on('open', () => {
  console.log('open');
});

readStream.on('error', err => {
  console.log(err);
});

readStream.on('data', data => {
  console.log(data);
});

readStream.on('close', () => {
  console.log('close');
});

// create writestream

let writeStream = fs.createWriteStream(str, {encoding: 'utf8'});
writeStream.on('open', () => {
  console.log('open')
});
writeStream.on('error', err => {
  console.log(err);
});

writeStream.on('close', () => {
  console.log('close');
});

let data = 'www.rick.com';
let index = 0;
let timerId = setInterval(() => {
  let ch = data[index];
  index++;
  writeStream.write(ch);
  console.log(ch);
  if(index === data.length) {
    clearInterval(timerId);
    writeStream.end();
  }
}, 3000);




