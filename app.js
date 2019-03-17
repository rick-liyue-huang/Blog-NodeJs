

const querystring = require('querystring');
// import two handle methods to deal with url blog and user
const blogRouterHandler = require('./src/router/blog');
const userRouterHandler = require('./src/router/user');

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

      resolve(JSON.stringify(postData));
    })
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
  const path = url.split('?')[0];
  const query = querystring.parse(url.split('?')[1]);

  // deal with post data by promise object
  getPostDataHandler(req).then(postdata => {

    req.body = postdata;
    /**
     * here notice that req.body can be null 
     *  */ 

     const blogData = blogRouterHandler(req, res);
     if(blogData) {
       res.end(JSON.stringify(blogData));
       return;
     }

     const userData = userRouterHandler(req, res);
     if(userData) {
       res.end(JSON.stringify(userData));
       return;
     }

     res.writeHead(404, {"content-type": "text/plain"});
     res.end('404 Not Found\n');

  })

 }

 module.exports = serverHandler;

 