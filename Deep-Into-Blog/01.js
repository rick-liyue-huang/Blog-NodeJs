
// 1. get the file directory and file
// console.log(__dirname);
// console.log(__filename);

// ---- 2. about Buffer ----
let buf = Buffer.alloc(6, 1, 'utf-8');
console.log(buf);
// 注意点： 得到16进制的6位数

let buf1 = Buffer.from('hello');
console.log(buf1);
buf1[0] = 6;
console.log(buf1); // buffer is array format

console.log(buf1.toString());

let buf2 = Buffer.alloc(8);
buf2.write('abcdefgh', 2); // 2 means offset 2 
console.log(buf2);

let buf3 = Buffer.alloc(8);
buf3.write('abcdefgh');
buf4 = buf3.slice(2, 5);
console.log(buf4);

// some Buffer static method
let res = Buffer.isEncoding('utf8');
console.log(res);
res = Buffer.isBuffer({});
console.log(res);
res = Buffer.byteLength(buf4);
console.log(res);
let buf5 = Buffer.from('123');
let buf6 = Buffer.from('abc');
res = Buffer.concat([buf5, buf6]);
console.log(res);

// ---- 3 about path ----
const path = require('path');

res = path.basename('/usr/local/etc/cc.html');
console.log(res); //cc.html 

res = path.basename('/usr/local/etc/cc.html', '.html');
console.log(res); // cc

res = path.dirname('/usr/local/etc/cc.html');
console.log(res); // /usr/local/etc

res = path.extname('/usr/local/etc/cc.html');
console.log(res); // .html

res = path.isAbsolute('/usr/local/etc/cc.html');
console.log(res); // true

res = path.sep;
console.log(res); // /

console.log(path.delimiter); // :

res = path.parse('/usr/local/etc/cc.html');
console.log(res);
/* {
  root: '/',
  dir: '/usr/local/etc',
  base: 'cc.html',
  ext: '.html',
  name: 'cc'
}
*/

res = path.format(res);
console.log(res); // /usr/local/etc/cc.html

res = path.join('/a/b', 'c', 'd.html');
console.log(res);

res = path.normalize('/usr/local/etc///cc.html');
console.log(res); // /usr/local/etc/cc.html 

res = path.relative('data/orandea/test/aaa', '/data/orandea/imp1/bbb');
console.log(res);

res = path.resolve('/foo/pa/', 'haha.txt');
console.log(res);



