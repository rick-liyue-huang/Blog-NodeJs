
// create util 'access' method

const fs = require('fs');
const path = require('path');

const writeLog = (writeStream, log) => {
  writeStream.write(log + '\n'); // key code
}

const createWriteStream = (fileName) => {
  const fullFileName = path.join(__dirname, '../', '../', 'logs', fileName);
  const writeStream = fs.createWriteStream(fullFileName, {
    flags: 'a'
  });
  return writeStream;

}

const accessWriteStream = createWriteStream('access.log');

// write access log
const access = (log) => {
  writeLog(accessWriteStream, log);
}

module.exports = {
  access
};
