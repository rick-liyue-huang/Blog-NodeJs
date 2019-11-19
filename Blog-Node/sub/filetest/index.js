
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

