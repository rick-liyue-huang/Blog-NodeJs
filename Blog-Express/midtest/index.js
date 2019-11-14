
const express = require('express');

const app = express();

app.use((req, res, next) => {
  console.log('request start...', req.method, req.url);
  next();
});

app.use((req, res, next) => {
  // deal with cookie
  req.cookie = {
    userId: 'rick'
  }
  next();
});

app.use((req, res, next) => {
  // post data
  setTimeout(() => {
    req.body = {
      a: 100,
      b: 200
    }
    next();
  });
  
});

app.use('/api', (req, res, next) => {
  console.log('deal with api router');
  next();
});

app.get('/api', (req, res, next) => {
  console.log('get api router');
  next();
});

app.post('/api', (req, res, next) => {
  console.log('post api router');
  next();
});

app.get('/api/get-cookie', loginCheck, (req, res, next) => {
  console.log('get api/get-cookie');
  res.json({
    errno: 0,
    data: req.cookie
  });
});

app.post('/api/get-postdata', (req, res, next) => {
  console.log('post api/get-postdata');
  res.json({
    errno: 0,
    data: req.body
  })
});

function loginCheck(req, res, next) {
  console.log('login success');
  setTimeout(() => {
    next()
  });
  
}

app.use((req, res, next) => {
  console.log('404');
  res.json({
    errno: -1,
    msg: '404 not found'
  });
});

app.listen(3000, () => {
  console.log('server is listening');
});