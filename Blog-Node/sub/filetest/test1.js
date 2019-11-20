
const fs = require('fs');
const path = require('path');

const filename = path.resolve(__dirname, 'data.txt');

// read file
// fs.readFile(filename, (err, data) => {
//   if(err) {
//     console.log(err);
//     return
//   }
//   console.log(data.toString()); // data is binary format
// });

const content = 'hshdj this is new file';
const opt = {
  flag: 'a'
};

// fs.writeFile(filename, content, opt, (err) => {
//   if(err) {
//     console.log(err);
//   }
// });

fs.exists(filename, (exist) => {
  console.log(exist); // true
});