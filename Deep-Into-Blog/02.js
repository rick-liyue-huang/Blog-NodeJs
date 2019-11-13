
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
})

