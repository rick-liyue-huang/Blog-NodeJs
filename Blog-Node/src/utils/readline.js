
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const filename = path.join(__dirname, '../', '../', 'logs', 'access.log');
// create readstream
const readStream = fs.createReadStream(filename);
// create read line
const rl = readline.createInterface({
  input: readStream
});

let chromeNum = 0;
let sum = 0;

// begin read line
rl.on('line', (lineData) => {
  if(!lineData) {
    return
  }
  // record sum line
  sum++;

  const arr = lineData.split(' -- ');
  if(arr[2] && arr[2].indexOf('Chrome') > 0) {
    // record chrome num
    chromeNum++;
  }

});

// listen
rl.on('close', () => {
  console.log('chrome rate: ', chromeNum / sum);
});