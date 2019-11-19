
const querystring = require('querystring');
const handleBlogRouter = require('./src/routers/blog');
const handleUserRouter = require('./src/routers/user');
const { set, get } = require('./src/db/redis');

const SESSION_DATA = {};
const getExpire = () => {
  const d = new Date();
  d.setTime(d.getTime() + (24 * 60 * 60 * 1000));
  console.log(d.toGMTString());
  return d.toGMTString();
};

const postDataHandler = (req) => {
  const promise = new Promise((resolve, reject) => {
    if('POST' !== req.method) {
      resolve({});
      return
    }
    if('application/json' !== req.headers['content-type']) {
      resolve({});
      return
    }
    let postData = '';
    req.on('data', chunk => {
      postData += chunk.toString();
    });
    req.on('end', () => {
      if(!postData) {
        resolve({});
        return
      }
      resolve(JSON.parse(postData));
    });
  });
  return promise;
}


const serverHandler = (req, res) => {

  res.setHeader('Content-Type', 'application/json');

  const url = req.url;
  req.path = url.split('?')[0];
  req.query = querystring.parse(url.split('?')[1]);

  // DECOMPOSE REQ.COOKIE
  req.cookie = {};
  const cookieStr = req.headers.cookie || '';
  cookieStr.split(';').forEach(item => {
    if(!item) {
      return
    }
    const arr = item.split('=');
    const key = arr[0].trim();
    const val = arr[1].trim();
    req.cookie[key] = val;
  });
  console.log('req.cookie: ', req.cookie);

  // DECOMPOSE SESSION
  /*
  let needSetCookie = false;
  let userId = req.cookie.userid;
  if(userId) {
    if(!SESSION_DATA[userId]) {
      SESSION_DATA[userId] = {};
    }   
  } else {
    needSetCookie = true;
    userId = `${Date.now()}_${Math.random()}`;
    SESSION_DATA[userId] = {};
  }
  req.session = SESSION_DATA[userId];
  */

  let needSetCookie = false;
  let userId = req.cookie.userid;
  if(!userId) {
    needSetCookie = true;
    userId = `${Date.now()}_${Math.random()}`;
    set(userId, {});
  }
  req.sessionId = userId;
  get(req.sessionId).then(sessionData => {
    if(null == sessionData) {
      set(req.sessionId, {});
      req.session = {};
    } else {
      req.session = sessionData;
    }
    console.log('req.session: ', req.session);

    return postDataHandler(req); // return promise object
  })

  /*postDataHandler(req)*/.then(postData => {

    req.body = postData;

    /*
    const blogData = handleBlogRouter(req, res);
    if(blogData) {
      res.end(JSON.stringify(blogData));
      return
    }
    */
   const blogResult = handleBlogRouter(req, res);
   console.log('blogResult: ', blogResult);
   if(blogResult) {
     blogResult.then(blogData => {

       if(needSetCookie) {
        res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getExpire()}`);
       }
       console.log('blogData: ', blogData);
       res.end(JSON.stringify(blogData));
     });
     return
   }

   /*
    const userData = handleUserRouter(req, res);
    if(userData) {
      res.end(JSON.stringify(userData));
      return
    }
    */

    const userResult = handleUserRouter(req, res);
    if(userResult) {
      userResult.then(userData => {

        if(needSetCookie) {
          res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getExpire()}`);
         }

        res.end(JSON.stringify(userData));
      });
      return
    }

    res.writeHead('404', {"Content-Type": "text/plain"});
    res.end('404 not found');

  });
  
}

module.exports = serverHandler;










/*
  if(method === 'GET') {
    res.end(JSON.stringify({
      method,
      url,
      path,
      query,
      env
    }));
  }

  if(method === 'POST') {
    let postData = '';
    req.on('data', chunk => {
      postData += chunk.toString();
    });
    req.on('end', () => {
      if(!postData) {
        return
      }
      res.end(JSON.stringify({
        postData,
        type: req.headers['content-type']
      }));
    });
  }

  */