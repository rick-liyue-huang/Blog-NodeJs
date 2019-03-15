// const fs = require('fs');
// const path = require('path');

// read file
// const fullFileName = path.resolve(__dirname, 'files', 'a.json');
// fs.readFile(fullFileName, (err, data) => {
//   if(err) {
//     console.log(err);
//     return
//   }
//   console.log(data.toString())
// });

// callback 
// function getFileContent(filename, callback) {
//   const fullFileName = path.resolve(__dirname, 'files', filename);
//   fs.readFile(fullFileName, (err, data) => {
//     if(err) {
//       console.log(err);
//       return
//     }
//     callback(JSON.parse(data.toString()));
//     console.log(data.toString())
//   });
// }

// callback too many times
// getFileContent('a.json', aData => {
//   console.log('a data, ', aData);
//   getFileContent(aData.next, bData => {
//     console.log('b data, ', bData);
//     getFileContent(bData.next, cData => {
//       console.log('c data, ', cData);
//     })
//   })
// });

// promise
// function getFileContent(filename) {
//   const promise = new Promise((resolve, reject) => {
//     const fullFileName = path.resolve(__dirname, 'files', filename);
//     fs.readFile(fullFileName, (err, data) => {
//       if(err) {
//         reject(err);
//         return
//       }
//       resolve(JSON.parse(data.toString()));
//     })
//   });

//   return promise;
// }

// return promise to chain coding
// getFileContent('a.json').then(aData => {
//   console.log('a data', aData);
//   return getFileContent(aData.next)
// }).then(bData => {
//   console.log('b data', bData);
//   return getFileContent(bData.next);
// }).then(cData => {
//   console.log('c data', cData);
// })

// async await 


const mysql = require('mysql');

// create connect object
const con = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'password',
  port: '3306',
  database: 'myblog1'
});

// start connect
con.connect();

// exec sql code
// const sql = 'select id, username from users;';
// const sql = `update users set realname='liyuehuang';`;
// const sql = 'select * from users;';
const sql = 'insert into users(username, `password`, realname) values("claire", "678", "huangmiduo");';
con.query(sql, (err, result) => {
  if(err) {
    console.error(err);
    return
  }
  console.log(result);
})

// close connect
con.end();

