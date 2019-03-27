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

// mysql test
/*
const mysql = require('mysql');

const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  port: 3306,
  database: 'myblog1'
});

con.connect();

const sql = 'select * from users;'
con.query(sql, (err, res) => {
  if(err) {
    console.log(err);
    return
  }
  console.log(res);
});

con.end();
*/

// redis test

// const redis = require('redis');

// // create client
// const redisClient = redis.createClient(6379, '127.0.0.1');
// redisClient.on('error', err => {
//   console.error(err);
// });

// // test
// redisClient.set('myname', 'hahaha', redis.print);
// // this async
// redisClient.get('myname', (err, val) => {
//   if(err) {
//     console.log(err);
//     return;
//   }
//   console.log('val ', val);

//   // quit
//   redisClient.quit();

// });

// file test - log

// const fs = require('fs');
// const path = require('path');

// const fileName = path.resolve(__dirname, 'files/data.txt');

// read file
// fs.readFile(fileName, (err, data) => {
//   if(err) {
//     console.log(err);
//     return
//   }
//   console.log(data.toString());
// });

// const content = `this is written content\n`;
// const opt = {
//   flag: 'a'  // append write, overwrite use 'w'
// };

// write file
// fs.writeFile(fileName, content, opt, (err) => {
//   if(err) {
//     console.log(err)
//   }
// });

// 判断文件是否存在
// fs.exists(fileName, (exist) => {
//   console.log('exist', exist);
// });

// const http = require('http');
// const server = http.createServer((req, res) => {
//   if(req.method === 'POST') {
//     req.pipe(res); // process.stdin.pipe(process.stdout)
//   }
// });
// server.listen(8000); // output from input


// stream test
// stdin stdout
// process.stdin.pipe(process.stdout); // similar as upper example

// const http = require('http');
// http.createServer((req, res) => {
//   if(req.method === 'POST') {
//     req.pipe(res);
//   }
// }).listen(8000)

// use stream to file

// const fs = require('fs');
// const path = require('path');

// const fileName1 = path.resolve(__dirname, 'files/data.txt');
// const fileName2 = path.resolve(__dirname, 'files/databack.js');

// const readStream = fs.createReadStream(fileName1);
// const writeStream = fs.createWriteStream(fileName2);

// readStream.pipe(writeStream);
// readStream.on('data', chunk => {
//   console.log(chunk.toString());
// });
// readStream.on('end', () => {
//   console.log('copy done');
// });


// readfile and show in screen

// const http = require('http');
// const fs = require('fs');
// const path = require('path');

// const fileName1 = path.resolve(__dirname, 'files/data.txt');
// const server = http.createServer((req, res) => {
//   if(req.method === 'GET') {
//     const readStream = fs.createReadStream(fileName1);
//     readStream.pipe(res);
//   }
// });
// server.listen(8000);

const getFileContent = (filename) => {
  const promise = new Promise((resolve, reject) => {

  });
  return promise
}

async function readFileData () {

}
