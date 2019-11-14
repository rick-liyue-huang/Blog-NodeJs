
// 7. create directory and confirm type
const fs = require('fs');
const path = require('path');

let str = path.join(__dirname, 'abc');
fs.mkdir(str, (err) => {
  if(err) {
    console.log(err);
  } else {
    console.log('success');
  }
});

fs.rmdir(str, err => {
  if(err) {
    console.log(err);
  } else {
    console.log('success');
  }
});

fs.readdir(__dirname, (err, data) => {
  if(err) {
    console.log(err);
  }
  console.log(data);
  data.forEach((obj) => {
    console.log(obj);
    let filePath = path.join(__dirname, obj);
    console.log(filePath);
    let stats = fs.statSync(filePath);
    if(stats.isFile()) {
      console.log('files: ', obj);
    } else if(stats.isDirectory()) {
      console.log('files: ', obj);
    }
  });
});

