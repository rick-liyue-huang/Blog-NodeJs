
const http = require('http');

// 组合中间件
function compose(middlewareList) {
  return function(ctx) {
    
  }
}

class Koa2Like {
  constructor() {
    this.middlewareList = [];
  }

  use(fn) {
    this.middlewareList.push(fn);
    return this;
  }

  callback() {
    return (req, res) => {

    }
  }

  listen(...arg) {
    const server = http.createServer(this.callback());
    server.listen(...args);
  }
}

module.exports = Koa2Like;