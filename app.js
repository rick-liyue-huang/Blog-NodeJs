

const querystring = require('querystring');
// import two handle methods to deal with url blog and user
const blogRouterHandler = require('./src/router/blog');
const userRouterHandler = require('./src/router/user');

const getCookieExpires = () => {
  const d = new Date();
  d.setTime(d.getTime() + (24 * 60 * 60 * 1000));
  console.log('d.toGMTString() is ', d.toGMTString());
  return d.toGMTString();
}

// session data
const SESSION_DATA = {};

/**
 * set up getPostDataHandler function
 * withdraw the function to get post data, and put the data on req.body when req.method === 'POST'
 *  */ 

 const getPostDataHandler = (req) => {

  //  create promise object to deal with postdata
  const promise = new Promise((resolve, reject) => {
    // if method is NOT Post
    if(req.method !== 'POST') {
      // get null object means req.body === null
      resolve({});
      return;
    }

    // if reqest header format is not json 
    if(req.headers['content-type'] !== 'application/json') {
      // get null object
      resolve({});
      return;
    }

    // deal with postdata
    let postData = '';
    req.on('data', chunk => {
      postData += chunk.toString(); // binary to string
    });

    req.on('end', () => {
      // if not get postdata
      if(!postData) {
        resolve({});
        return;
      }

      // transfer string to object
      resolve(JSON.parse(postData));
    });
  });

  return promise;
 }


/**
 *  set up serverHandler function, used for deal with server logic application 
 *  and export to server file of 'bin/www.js'
 *  */  

 const serverHandler = (req, res) => {
  
  // set response header format
  res.setHeader('content-type', 'application/json');

  // set request parameters
  const url = req.url;
  req.path = url.split('?')[0];
  req.query = querystring.parse(url.split('?')[1]);

  /**
   *  decompose cookie in server
   *  */ 
  /**
   * in browser terminal: run `document.cookie='name=leo'`
   * and then renew the browser page, we get {name: 'leo'}
   *  */ 
  req.cookie = {};
  const cookieStr = req.headers.cookie || ''; // k1=v1;k2=v2;k3=v3
  cookieStr.split(';').forEach(item => {
    if(!item) {
      return
    }
    const arr = item.split('=');
    const key = arr[0].trim();
    const val = arr[1].trim();
    console.log(key, val);
    req.cookie[key] = val;
  });
  console.log('req.cookie is ', req.cookie);
  
  /**
   *  decompose session
   *  */ 
  // firslty try to get userid from req.cookie
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
  


  // deal with post data by promise object
  getPostDataHandler(req).then(postdata => {

    req.body = postdata;
    /**
     * here notice that req.body can be null 
     *  */ 

    /*
    const blogData = blogRouterHandler(req, res);
    if(blogData) {
      res.end(JSON.stringify(blogData));
      return
    }
    */
    
    const blogResult = blogRouterHandler(req, res);
    if(blogResult) {
      blogResult.then(blogData => {

        // confirm session
        if(needSetCookie) {
          res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires='${getCookieExpires()}'`);
        }

        res.end(JSON.stringify(blogData));
      });
      return
    }

    /*
    const userData = userRouterHandler(req, res);
    if(userData) {
      res.end(JSON.stringify(userData));
      return
    }
    */
   const userResult = userRouterHandler(req, res);
   if(userResult) {
     userResult.then(userData => {
      // set cookie
      if(needSetCookie) {
        res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires='${getCookieExpires()}'`);
      }
       res.end(JSON.stringify(userData));
     });
     return
   }

     res.writeHead(404, {"content-type": "text/plain"});
     res.end('404 Not Found\n');

  })

 }

 module.exports = serverHandler;



 