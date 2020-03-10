const fs = require("fs");
const path = require("path");

const fileName = path.resolve(__dirname, "data.txt");
// 读取文件内容
// 异步操作
fs.readFile(fileName, (err, data) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(data.toString());
});

// 写入文件
const content = `this is file content \n`;
const opt = {
  flag: "a"
};
fs.writeFile(fileName, content, opt, err => {
  if (err) {
    console.log(err);
  }
});

//判断文件是否存在
fs.exists(fileName, exist => {
  console.log("exist: ", exist);
});
