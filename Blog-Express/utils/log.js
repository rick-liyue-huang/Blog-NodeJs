

// create access method to write log in access.log

const fs = require('fs');
const path = require('path');

function createWriteStream(filename) {
  const fullFileName = path.resolve(__dirname, '../', '../', 'logs', filename);
  const writestream = fs.createWriteStream(fullFileName, {
    flags: 'a'
  });
  return writestream;
}

function writeLog(writeStream, log) {
  writeStream.write(log + '\n');
}

const accessWriteStream = createWriteStream('access.log');

function access(log) {
  writeLog(accessWriteStream, log);
}

module.exports = { access }