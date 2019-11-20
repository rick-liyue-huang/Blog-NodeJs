
const http = require('http');
const slice = Array.prototype.slice;

class ExpressLike {

  constructor() {
    // store middleware list 存放中间件列表
    this.routes = {
      all: [], // app.use
      get: [], // app.get
      post: [] // app.post
    }
  }

  // the common method for use get post
  register(path) {
    const info = {};
    if(typeof path === 'string') {
      // for router
      info.path = path;
      info.stack = slice.call(arguments, 1) // stack is array
    } else {
      // if not router, will apply on '/'
      info.path = '/';
      info.stack = slice.call(arguments, 0);
    }
    return info; // info {path: '', stack: []}
  }

  use() {
    const info = this.register.apply(this, arguments);
    // 将当前函数的所有参数arguments全部传入register中，然后执行register，返回info
    this.routes.all.push(info);
  }

  get() {
    const info = this.register.apply(this, arguments);
    // 将当前函数的所有参数arguments全部传入register中，然后执行register，返回info
    this.routes.get.push(info);
  }

  post() {
    const info = this.register.apply(this, arguments);
    // 将当前函数的所有参数arguments全部传入register中，然后执行register，返回info
    this.routes.post.push(info);
  }

  match(method, url) {
    let stack = [];
    if(url === '/favicon.ico') {
      return stack;
    }

    // 获取 routes
    let curRoutes = [];
    curRoutes = curRoutes.concat(this.routes.all); // 通过use 得到的都需要
    curRoutes = curRoutes.concat(this.routes[method]); //通过方法得到get post

    curRoutes.forEach(routeInfo => {
      if(url.indexOf(routeInfo.path) === 0) {
        // url === '/api/get-cookie' 且 routeInfo.path === '/api
        // url === '/api/get-cookie' 且 routeInfo.path === '/
        // url === '/api/get-cookie' 且 routeInfo.path === '/api/get-cookie
        stack = stack.concat(routeInfo.stack);
      }
    });
    return stack; // stack 是 中间件数组
  }

  // define next 
  handle(req, res, stack) {
    const next = () => {
      // 拿到第一个匹配的中间件
      const middleware = stack.shift();
      if(middleware) {
        // 执行中间件函数
        middleware(req, res, next);
      }
    }
    next();
  }

  callback() {
    return (req, res) => {
      res.json = data => {
        res.setHeader('Content-type', 'application/json');
        res.end(JSON.stringify(data));
      }
      const url = req.url;
      const method = req.method.toLowerCase();

      const resultList = this.match(method, url);
      this.handle(req, res, resultList); // resultList is stack
    }
  }

  listen(...args) {
    const server = http.createServer(this.callback());
    server.listen(...args);
  }


}

// factory function
module.exports = () => {
  return new ExpressLike()
}