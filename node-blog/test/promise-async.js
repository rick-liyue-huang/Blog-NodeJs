const fs = require("fs");
const path = require("path");

// callback
function getFileContent(fileName, callback) {
  const fullFileName = path.resolve(__dirname, fileName);
  fs.readFile(fullFileName, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    callback(JSON.parse(data.toString()));
  });
}

getFileContent("a.json", aData => {
  console.log("a data: ", aData);
  getFileContent(aData.next, bData => {
    console.log("b data: ", bData);
    getFileContent(bData.next, cData => {
      console.log("c data: ", cData);
    });
  });
});

function getFileContent1(fileName) {
  const promise = new Promise((resolve, reject) => {
    const fullFileName = path.resolve(__dirname, fileName);
    fs.readFile(fullFileName, (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(JSON.parse(data.toString()));
    });
  });
  return promise;
}

getFileContent1("a.json")
  .then(aData => {
    console.log("a data: ", aData);
    return getFileContent1(aData.next);
  })
  .then(bData => {
    console.log("b data: ", bData);
    return getFileContent1(bData.next);
  })
  .then(cData => {
    console.log("c data: ", cData);
  });

// 必须使用async 包裹 变为同步的方法
async function readFileData() {
  try {
    const aData = await getFileContent1("a.json");
    console.log("a data: ", aData);
    const bData = await getFileContent1(aData.next);
    console.log("b data: ", bData);
    const cData = await getFileContent1(bData.next);
    console.log("c data: ", cData);
  } catch (e) {
    console.log("reject");
  }
}

readFileData(); // 返回的也是 promise对象
