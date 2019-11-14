
const http = require('http');

const server = http.createServer((req, res) => {
  // simu log
  console.log('current time: ', Date.now());
  // simu err
  console.error('er');

  if(req.url === '/err') {
    throw new Error('/err wrong');
  }

  res.setHeader('Content-type', 'application/json');
  res.end(
    JSON.stringify({
      errno: 0,
      msg: 'pm2 test server 3'
    })
  );
})

server.listen(8000, () => {
  console.log('server is on 8000...');
})