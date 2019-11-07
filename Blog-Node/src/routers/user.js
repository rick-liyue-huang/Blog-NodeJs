
const { SuccessModel, ErrorModel } = require('../model/resModel');
const { postLoginHandler } = require('../controllers/user');

const { set } = require('../db/redis');
/*
const getCookieExpires = () => {
  const d = new Date();
  d.setTime(d.getTime() + (24 * 60 * 60 * 1000));
  return d.toGMTString();
}
*/

const handleUserRouter = (req, res) => {

  const method = req.method;
  
  if('GET' === method && '/api/user/login' === req.path) {
    // return {
    //   msg: 'login'
    // }

    // const { username, password } = req.body;
    const { username, password } = req.query;
    // const loginData = postLoginHandler(username, password);
    // if(loginData) {
    //   return new SuccessModel(loginData);
    // } else {
    //   return new ErrorModel('un login');
    // }

    const loginResult = postLoginHandler(username, password);
    return loginResult.then(loginData => {
      console.log('loginData: ------- ', loginData);
      if(loginData.username) {

        // 操作cookie
        // res.setHeader('Set-Cookie', `username=${loginData.username}; path=/; httpOnly; expires=${getCookieExpires()}`);

        // 设置session
        req.session.username = loginData.username;
        req.session.realname = loginData.realname;

        // store it in redis
        set(req.sessionId, req.session);

        console.log('req.session: ------ ', req.session);

        return new SuccessModel(loginData);
      } else {
        return new ErrorModel('unlogin');
      }
    });
  }


  // user login test: confirm the cookie has username property
  if('GET' === method && '/api/user/login-test' === req.path) {
    if(/*req.cookie.username*/req.session.username) {
      // return new SuccessModel();
      return Promise.resolve(new SuccessModel({
        // username: req.cookie.username
        session: req.session
      }))
    } else {
      return Promise.resolve(new ErrorModel('unlogin'));
    }
  }
}

module.exports = handleUserRouter;