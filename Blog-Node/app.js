
const querystring = require('querystring');
const handleBlogRouter = require('./src/routers/blog');
const handleUserRouter = require('./src/routers/user');
const { get, set } = require('./src/db/redis');

const getCookieExpires = () => {
  const d = new Date();
  d.setTime(d.getTime() + (24 * 60 * 60 * 1000));
  return d.toGMTString();
}

// session data
// const SESSION_DATA = {};

const getPostDataHandler = (req) => {
  const promise = new Promise((resolve, reject) => {
    if('POST' !== req.method) {
      resolve({});
      return;
    }
    if('application/json' !== req.headers['content-type']) {
      resolve({});
      return;
    }
    let postData = '';
    req.on('data', chunk => {
      postData += chunk.toString();
    });
    req.on('end', () => {
      if(!postData) {
        resolve({});
        return;
      }
      resolve(JSON.parse(postData));
    })
  });

  return promise;
}

const serverHandler = (req, res) => {
  // set response type
  res.setHeader('Content-type', 'application/json');

  const url = req.url;
  req.path = url.split('?')[0];
  req.query = querystring.parse(url.split('?')[1]);

  // decompose cookie
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

  console.log('req.cookie :', req.cookie);

  // decompose session
  /*
  let needSetCookie = false;
  let userId = req.cookie.userid;
  if(userId) {
    if(SESSION_DATA[userId]) {
      req.session = SESSION_DATA[userId];
    } else {
      SESSION_DATA[userId] = {};
      req.session = SESSION_DATA[userId];
    }
  } else {
    needSetCookie = true;
    userId = `${Date.now()}_${Math.random()}`;
    SESSION_DATA[userId] = {};
    req.session = SESSION_DATA[userId];
  }

  */

  // decompose session by redis
  let needSetCookie = false;
  let userId = req.cookie.userid;
  if(!userId) {
    needSetCookie = true;
    userId = `${Date.now()}_${Math.random()}`;
    // initial session in redis
    set(userId, {});
  }
  // get session
  req.sessionId = userId;
  get(req.sessionId).then(sessionData => {
    if(sessionData == null) {
      set(req.sessionId, {});
      // setting session
      req.session = {}

    } else {
      req.session = sessionData;
    }
    console.log('req.session: --------', req.session);

    // deal with postdata
    return getPostDataHandler(req)
  })


  // deal with postdata
  /*getPostDataHandler(req)*/.then(postData => {
    req.body = postData;

    // deal with blog router
    // const blogData = handleBlogRouter(req, res);
    // if(blogData) {
    //   res.end(JSON.stringify(blogData));
    //   return;
    // }
    const blogResult = handleBlogRouter(req, res);
    if(blogResult) {
      blogResult.then(blogData => {

        if(needSetCookie) {
          res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`);
        }
        res.end(JSON.stringify(blogData));
      });
      return
    }
    

    // deal with user router
    // const userData = handleUserRouter(req, res);
    // if(userData) {
    //   res.end(JSON.stringify(userData));
    //   return;
    // }

    const userResult = handleUserRouter(req, res);
    if(userResult) {
      userResult.then(userData => {

        if(needSetCookie) {
          res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`);
        }

        res.end(JSON.stringify(userData));
      });
      return
    }

    // deal with 404
    res.writeHead(404, {"content-type": 'text/plain'});
    res.end('404 Not Found\n');

  });
  
}

module.exports = serverHandler;

// env: process.env.NODE_ENV,