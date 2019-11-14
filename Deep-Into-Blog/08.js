
const url = require('url');

let str = 'http://root:123456@www.rick.com:80/index.html?name=rick&age=33#banner';

console.log(url.parse(str, true));
/**
 * {
  protocol: 'http:',
  slashes: true,
  auth: 'root:123456',
  host: 'www.rick.com:80',
  port: '80',
  hostname: 'www.rick.com',
  hash: '#banner',
  search: '?name=rick&age=33',
  query: [Object: null prototype] { name: 'rick', age: '33' },
  pathname: '/index.html',
  path: '/index.html?name=rick&age=33',
  href:
   'http://root:123456@www.rick.com:80/index.html?name=rick&age=33#banner' }
 */

 