
const fs = require('fs');
const path = require('path');

// fs.readFile(fullFileName, (err, data) => {
//   if(err) {
//     console.log(err);
//     return
//   }

//   console.log(data.toString());
// });

// callback pattern to get the file content
// function getFileContent(fileName, callback) {
//   const fullFileName = path.resolve(__dirname, 'files', fileName);
//   fs.readFile(fullFileName, (err, data) => {
//     if(err) {
//       console.log(err);
//       return
//     }
//     callback(JSON.parse(data.toString()));
//     // console.log(data.toString());
//   });
// }

// getFileContent('a.json', aData => {
//   console.log(aData);
//   getFileContent(aData.next, bData => {
//     console.log(bData);
//     getFileContent(bData.next, cData => {
//       console.log(cData);
//     })
//   })
// });

function getFileContent(fileName) {
  const promise = new Promise((resolve, reject) => {
    const fullFileName = path.resolve(__dirname, 'files', fileName);
    fs.readFile(fullFileName, (err, data) => {
      if(err) {
        reject(err);
        return
      }
      resolve(JSON.parse(data.toString()));
    })
  });
  return promise;
}

/*
getFileContent('a.json').then((aData) => {
  console.log(aData);
  return getFileContent(aData.next);
}).then(bData => {
  console.log(bData);
  return getFileContent(bData.next);
}).then(cData => {
  console.log(cData);
})
*/

async function readFileData() {
  try {
    const aData = await getFileContent('a.json');
    console.log('a data', aData);
    const bData = await getFileContent(aData.next);
    console.log('b data', bData);
    const cData = await getFileContent(bData.next);
    console.log('c data', cData);

  } catch (e) {
    console.log(e);
  }
  
}

readFileData();

async function readAdata() {
  const aData = await getFileContent('a.json');
  return aData
}

async function test() {
  const aData = await readAdata();
  console.log(aData);
}
test();

// async await:
// 1. await 后爱你可以追加promise对象
// 2. await 必须包裹在 async 函数里面
// 3. async 函数执行返回的也是一个promise 对象
// 4. try-catch 接货promise 中 reject的值



