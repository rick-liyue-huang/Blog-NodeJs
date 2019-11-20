
const fs = require('fs');
const path = require('path');

const fullFileName = path.resolve(__dirname, 'files', 'a.json');

fs.readFile(fullFileName, (err, data) => {
  if(err) {
    console.log(err);
    return
  }
  // console.log(data.toString());
});

/*
function getFileContent (filename, callback) {

  const fullFileName = path.resolve(__dirname, 'files', filename);
  fs.readFile(fullFileName, (err, data) => {
    if(err) {
      console.log(err);
      return
    }
    callback(JSON.parse(data.toString()));
  });
}

*/

/*
getFileContent('a.json', (adata) => {
  console.log('adata: ', adata);
  getFileContent(adata.next, bdata => {
    console.log('bdata: ', bdata);
    getFileContent(bdata.next, cdata => {
      console.log('cdata: ', cdata);
    });
  });
});

*/



/*
function getFileContent(filename) {
  const promise = new Promise((resolve, reject) => {
    const fullFileName = path.join(__dirname, 'files', filename);
    fs.readFile(fullFileName, (err, data) => {
      if(err) {
        reject(err);
        return;
      }
      resolve(JSON.parse(data.toString()));
    });
  });
  return promise;
}

getFileContent('a.json').then(adata => {
  console.log('adata: ', adata);
  return getFileContent(adata.next);
}).then(bdata => {
  console.log('bdata: ', bdata);
  return getFileContent(bdata.next);
}).then(cdata => {
  console.log('cdata: ', cdata);
});

*/

function getFileContent(filename) {
  const promise = new Promise((resolve, reject) => {
    const fullFileName = path.join(__dirname, 'files', filename);
    fs.readFile(fullFileName, (err, data) => {
      if(err) {
        reject(err);
        return;
      }
      resolve(JSON.parse(data.toString()));
    });
  });
  return promise;
}

/*
async function readFileData() {
  const aData = await getFileContent('a.json');
  console.log('a data', aData);
  const bData = await getFileContent(aData.next);
  console.log('b data', bData);
  const cData = await getFileContent(bData.next);
  console.log('cData', cData);
}

readFileData();

*/

async function readData() {
  const aData = await getFileContent('a.json');
  return aData;
}

async function test() {
  const aData = await readData();
  console.log(aData);
}

test();

// await 后面可以追加promise对象
// await 必需包裹在async 函数里面
// async 函数返回的也是一个promise对象
// try catch 截获promise 中的 reject的值

