
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const fileName = path.resolve(__dirname, '../', '../', 'logs', 'access.log');

// create readstream
const readStream = fs.createReadStream(fileName);

// create readline
const rl = readline.createInterface({
  input: readStream
});

let chromeNum = 0;
let sum = 0;

rl.on('line', line => {
  if(!line) {
    return
  }
  // record total lines
  sum++;

  const arr = line.split(' -- ');
  if(arr[2] && arr[2].indexOf('Chrome') > 0) {
    // get chrome number
    chromeNum++;
  }
});

rl.on('close', () => {
  console.log(chromeNum / sum);
});