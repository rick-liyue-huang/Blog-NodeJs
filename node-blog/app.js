const querystring = require("querystring");
const handleBlogRouter = require("./src/router/blog");
const handleUserRouter = require("./src/router/user");

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

  getPostData(req).then(postData => {
    req.body = postData;

    // 处理blog路由
    const blogData = handleBlogRouter(req, res);
    if (blogData) {
      res.end(JSON.stringify(blogData));
      return;
    }

    const userData = handleUserRouter(req, res);
    if (userData) {
      res.end(JSON.stringify(userData));
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
