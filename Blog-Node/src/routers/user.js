
const { SuccessModel, ErrorModel } = require('../model/resModel');
const { handlePostLogin } = require('../controllers/user');
const { set } = require('../db/redis');

const handleUserRouter = (req, res) => {

  let method = req.method;
  method = method.toLowerCase();

  if('post' === method && '/api/user/login' === req.path) {
    // return {
    //   msg: 'login'
    // }

    const { username, password } = req.body;
    // const { username, password } = req.query;

    /*
    const loginData = handlePostLogin(username, password);
    if(loginData) {
      return new SuccessModel(loginData);
    } else {
      return new ErrorModel('unlogin');
    }
    */

    const loginResult = handlePostLogin(username, password);
    return loginResult.then(loginData => {

      if(loginData.username) {

        // res.setHeader('Set-Cookie', `username=${loginData.username}; path=/; httpOnly; expires=${getExpire()}`);
        req.session.username = loginData.username;
        req.session.realname = loginData.realname;

        set(req.sessionId, req.session);

        return new SuccessModel(loginData);
      } else {
        return new ErrorModel('unlogin');
      }
    });
  }


  if('get' === method && '/api/user/login-test' === req.path) {
    if(/*req.cookie.username*/req.session.username) {
      return Promise.resolve(new SuccessModel({
        session: req.session
      }))
    }
    return Promise.resolve(new ErrorModel('unlogin'));
  }
}

module.exports = handleUserRouter;

