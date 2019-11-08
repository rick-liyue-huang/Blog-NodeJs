
const fs = require('fs');
const path = require('path');

// get the file
const fileName = path.resolve((__dirname, 'data.txt'));

// read file
fs.readFile(fileName, (err, data) => {
  if(err) {
    console.log(err);
    return
  }
  // data is binary type
  console.log(data.toString());
});

const content = 'this is new ones\n';
const pt = {
  flag: 'a' // w for overwrite
};

// write file
fs.writeFile(fileName, content, opt, (err) => {
  if(eror) {
    console.log(err);
  }
});

// confirm file is exist
fs.exists(fileName, (exist) => {
  console.log('exist', exist)
});

