// app.use 用来注册中间件，先收集起来
// 遇到 http 请求，根据 path method 判断触发哪些
// 实现 next 机制，即上一个通过 next 触发下一个

const http = require("http");
const slice = Array.prototype.slice;

class LikeExpress {
  constructor() {
    // 存放中间件的列表
    this.routes = {
      all: [], // 存放用use的中间件 app.use()
      get: [], // app.get()
      post: [] // app.post()
    };
  }

  // 通用的注册中间件方法
  register(path) {
    // 考虑中间件第一个参数可以使路由字符串或者是直接是函数
    const info = {};
    if (typeof path === "string") {
      // 字符串路由情况，表示显式的提供路由
      info.path = path;
      // 将后面的函数方法直接放入到info.stack数组里面，从第二个参数开始存入到数组
      info.stack = slice.call(arguments, 1);
    } else {
      // 第一个参数是函数的时候，就表示默认处理根路由
      info.path = "/";
      // 从第一个参数开始就变为数组元素存入stack
      info.stack = slice.call(arguments, 0);
    }
    return info;
    // info: {path: '', stack: []}
    // info 有两个信息：path 和 stack
  }

  use() {
    // 将use函数里面的所有参数都穿入到register中，然后执行
    const info = this.register.apply(this, arguments);
    this.routes.all.push(info);
    然后将这些中间件存入all属性中;
  }
  get() {
    const info = this.register.apply(this, arguments);
    this.routes.get.push(info);
  }

  post() {
    const info = this.register.apply(this, arguments);
    this.routes.post.push(info);
  }

  match(method, url) {
    let stack = []; // 要返回的resultList
    if (url === "/favicon.ico") {
      return stack; // 忽略这种情况
    }
    // 获取routes
    let curRoutes = [];
    // 通过use得到的中间件都要
    curRoutes = curRoutes.concat(this.routes.all);
    // 通过数组下标来确定需要哪些中间件
    curRoutes = curRoutes.concat(this.routes[method]);

    curRoutes.forEach(routeInfo => {
      if (url.indexOf(routeInfo.path) === 0) {
        // url === '/api/get-cookie' 且 routeInfo.path === '/'
        // 返回stack数组
        stack = stack.concat(routeInfo.stack);
      }
    });
    return stack;
  }

  // 核心的next机制
  handle(req, res, stack) {
    const next = () => {
      // 拿到第一个匹配的中间件，通过递归
      const middleware = stack.shift();
      if (middleware) {
        // 执行中间件函数
        middleware(req, res, next);
      }
    };
    next();
  }

  callback() {
    return (req, res) => {
      res.json = data => {
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(data));
      };
      const url = req.url;
      const method = req.method.toLowerCase();
      // 通过url和method区分哪些需要访问
      // 返回含有中间件的列表
      const resultList = this.match(method, url);

      //
      this.handle(req, res, resultList);
    };
  }
  listen(...args) {
    // 可能传入端口号或者回调函数
    const server = http.createServer(this.callback());
    server.listen(...args); // 保证使用nodejs的标准
  }
}

module.exports = () => {
  return new LikeExpressMiddleware();
};
