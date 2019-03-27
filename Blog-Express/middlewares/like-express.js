
const http = require('http');
const slice = Array.prototype.slice;

class LikeExpress {
  constructor() {
    // store middleware list
    this.routes = { // use, get, post
      all: [],
      get: [],
      post: []
    }
  }

  // base method for following methods
  // firstly confirm it has '/xxx' or not
  register(path) {
    const info = {};
    if(typeof path === 'string') {
      info.path = path;
      // stack is the middleware
      // 从第二个参数开始转化为数组存入stack
      info.stack = slice.call(arguments, 1); // stack is array
    } else {
      info.path = '/';
      // 从第一个参数开始转化为数组存入stack
      info.stack = slice.call(arguments, 0);
    }
    return info;
    // info: {
    //   path,
    //   stack
    // }
  }

  use() {
    const info = this.register.apply(this, arguments);
    this.routes.all.push(info);
  }

  get() {
    const info = this.register.apply(this, arguments);
    this.routes.get.push(info);
  }

  post() {
    const info = this.register.apply(this, arguments);
    this.routes.post.push(info);
  }

  listen(...args) {
    const server = http.createServer()
  }
}

module.exports = () => {
  return new LikeExpress()
}