const fs = require("fs");
const path = require("path");

const createWriteStream = fileName => {
  const fullFileName = path.join(__dirname, "../", "../", "logs", fileName);
  const writeStream = fs.createWriteStream(fullFileName, {
    flag: "a"
  });
  return writeStream;
};

const accessWriteStream = createWriteStream("access.log");

const writeLog = (writeStream, log) => {
  writeStream.write(log + "\n");
};

// 写访问日志的外界方法
const access = log => {
  writeLog(accessWriteStream, log);
};

module.exports = { access };
