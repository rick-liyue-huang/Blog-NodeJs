const querystring = require("querystring");
const handleBlogRouter = require("./src/router/blog");
const handleUserRouter = require("./src/router/user");
const { get, set } = require("./src/db/redis");
// session 数据
// const SESSION_DATA = {};

const setCookieExpires = () => {
  const d = new Date();
  d.setTime(d.getTime() + 24 * 60 * 60 * 1000);
  return d.toGMTString();
};
// 处理post数据
const getPostData = req => {
  const promise = new Promise((resolve, reject) => {
    if (req.method !== "POST") {
      resolve({});
      return;
    }
    if (req.headers["content-type"] !== "application/json") {
      resolve({});
      return;
    }
    let postData = "";
    req.on("data", chunk => {
      postData += chunk.toString();
    });
    req.on("end", () => {
      if (!postData) {
        resolve({});
        return;
      }
      resolve(JSON.parse(postData));
    });
  });
  return promise;
};

const serverHandler = (req, res) => {
  // 设置返回格式
  res.setHeader("Content-Type", "application/json");
  const url = req.url;
  req.path = url.split("?")[0];
  // 解析querystring
  req.query = querystring.parse(url.split("?")[1]);

  // 解析cookie
  req.cookie = {};
  const cookieStr = req.headers.cookie || ""; // k1=v1;k2=v2;
  cookieStr.split(";").forEach(item => {
    if (!item) {
      return;
    }
    const arr = item.split("=");
    const key = arr[0].trim();
    const val = arr[1].trim();
    req.cookie[key] = val;
  });
  console.log("req.cookie is ", req.cookie);

  // 解析session
  /*
  const userId = req.cookie.userid;
  if (userId) {
    if (SESSION_DATA[userId]) {
      req.session = SESSION_DATA[userId];
    } else {
      SESSION_DATA[userId] = {};
      req.session = SESSION_DATA[userId];
    }
  }
  */

  /*
  let needSetCookie = false;
  let userId = req.cookie.userid;
  if (userId) {
    if (!SESSION_DATA[userId]) {
      SESSION_DATA[userId] = {};
    }
  } else {
    needSetCookie = true;
    userId = `${Date.now()}_${Math.random()}`;
    SESSION_DATA[userId] = {};
  }
  req.session = SESSION_DATA[userId];

  */

  // 解析session 用 redis
  let needSetCookie = false;
  let userId = req.cookie.userid;
  if (!userId) {
    needSetCookie = true;
    userId = `${Date.now()}_${Math.random()}`;
    // 初始化session
    set(userId, {});
  }
  // 获取session
  req.sessionId = userId;
  get(req.sessionId)
    .then(sessionData => {
      if (sessionData == null) {
        // 初始化redis 中的session值
        set(req.sessionId, {});
        // 设置session
        req.session = {};
      } else {
        req.session = sessionData;
      }
      console.log("req.session ", req.session);
      return getPostData(req);
    })
    .then(postData => {
      req.body = postData;

      // 处理blog路由
      /*
    const blogData = handleBlogRouter(req, res);
    if (blogData) {
      res.end(JSON.stringify(blogData));
      return;
    }
    */
      //  得到promise
      const blogResult = handleBlogRouter(req, res);
      if (blogResult) {
        blogResult.then(blogData => {
          if (needSetCookie) {
            res.setHeader(
              "Set-Cookie",
              `userid=${userId}; path=/; httpOnly; expires=${setCookieExpires()}`
            );
          }
          res.end(JSON.stringify(blogData)); // 对应着listData
        });
        return;
      }

      /*
    const userData = handleUserRouter(req, res);
    if (userData) {
      res.end(JSON.stringify(userData));
      return;
    }
    */
      const userResult = handleUserRouter(req, res);
      if (userResult) {
        userResult.then(userData => {
          if (needSetCookie) {
            res.setHeader(
              "Set-Cookie",
              `userid=${userId}; path=/; httpOnly; expires=${setCookieExpires()}`
            );
          }
          res.end(JSON.stringify(userData));
        });
        return;
      }

      // 如果没有
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.write("404 not found \n");
      res.end();
    });
};

module.exports = serverHandler;

// process.env.NODE_ENV
