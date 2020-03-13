// app.use 用来注册中间件，先收集起来
// 遇到 http 请求，根据 path method 判断触发哪些
// 实现 next 机制，即上一个通过 next 触发下一个
// 但是不用考虑method

const http = require("http");
const slice = Array.prototype.slice;

// 组合中间件
function compose(middlewareList) {
  return function(ctx) {
    // 中间件调用的逻辑
    function dispatch(i) {
      const fn = middlewareList[i]; // fn 是取出来的中间件
      try {
        return Promise.resolve(fn(ctx, dispatch.bind(null, i + 1)));
      } catch (e) {
        return Promise.reject(e);
      }
    }
    return dispatch(0);
  };
}

class LikeKoa {
  constructor() {
    this.middlewareList = []; // 中间件存储的地方
  }

  use(fn) {
    this.middlewareList.push(fn); // 用use函数注册
    return this; // 可以链式调用
  }

  callback() {
    return (req, res) => {};
  }

  listen(...args) {
    // 调用node.js的方法
    const server = http.createServer(this.callback());
    server.listen(...args);
  }
}

module.exports = LikeKoa;
