
// create log method
const fs = require('fs');
const path = require('path');

// log is string, writeStream is stream
const writeLog = (writeStream, log) => {
  writeStream.write(log + '\n');
}

const createWriteStream = (filename) => {
  const fullFileName = path.join(__dirname, '../', '../', 'logs', filename);
  const writeStream = fs.createWriteStream(fullFileName, {
    flags: 'a'
  });
  return writeStream;
}

const accessWrtieStream = createWriteStream('access.log');

const access = (log) => {
  writeLog(accessWrtieStream, log);
}

module.exports = { access };