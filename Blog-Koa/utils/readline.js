
const fs = require('fs');
const path = require('path');
const readline = require('readline');

// get full file info
const fileName = path.join(__dirname, '../', '../', 'logs', 'access.log');

// creat read stream
const readStream = fs.createReadStream(fileName);

// create readline object
const rl = readline.createInterface({
  input: readStream
});

let chromeNum = 0;
let sum = 0;

// read by lines
rl.on('line', (lineData) => {
  if(!lineData) {
    return
  }
  // record total line number
  sum++;

  const arr = lineData.split(' -- ');
  if(arr[2] && arr[2].indexOf('Chrome') > 0) {
    // get chrome number
    chromeNum++
  }

});

// listen read close
rl.on('close', () => {
  console.log('chrom percent: ', chromeNum / sum );
})

