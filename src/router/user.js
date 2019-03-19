
const {
  SuccessModel,
  ErrorModel
} = require('../model/resModel');
const { postUserLoginHandler } = require('../controller/user'); 
const { set } = require('../db/redis');

// set cookie expires time
// const getCookieExpires = () => {
//   const d = new Date();
//   d.setTime(d.getTime() + (24 * 60 * 60 * 1000));
//   console.log('d.toGMTString() is ', d.toGMTString());
//   return d.toGMTString();
// }

const userRouterHandler = (req, res) => {
  
  
  // if(req.method === 'POST' && req.path === '/api/user/login') {
    
  //   const { username, password } = req.body;
  //   const loginResult = postUserLoginHandler(username, password);
  //   return loginResult.then(loginData => {
  //     if(loginData.username) {
  //       return new SuccessModel();
  //     } else {
  //       return new ErrorModel('login fail');
  //     }
  //   })

  //   /*
  //   const { username, password } = req.body;
  //   const userData = postUserLoginHandler(username, password);
  //   if(userData) {
  //     return new SuccessModel(userData);
  //   } else {
  //     return new ErrorModel('login fail');
  //   }
  //   */

  //   /*
  //   return {
  //     msg: 'user'
  //   }
  //   */
  // }

  if(req.method === 'POST' && req.path === '/api/user/login') {
    const { username, password } = req.body;
    const result = postUserLoginHandler(username, password);
    return result.then(data => {
      if(data.username) {

        // server set cookie httpOnly 只允许后端改
        // res.setHeader('Set-Cookie', `username=${data.username}; path=/; httpOnly; expires='${getCookieExpires()}'`);
        
        req.session.username = data.username;
        req.session.realname = data.realname;
        // sync to redis
        set(req.sessionId, req.session);

        console.log('req.session is ', req.session);
        
        return new SuccessModel();
      }
      return new ErrorModel('login fail');
    });
  }

  // only for login test
  
  // if(req.method === 'GET' && req.path === '/api/user/login-test') {
  //   if(/*req.cookie.username*/ req.session.username) {
  //     return Promise.resolve(new SuccessModel({
  //       // username: req.cookie.username
  //       session: req.session
  //     }))
  //   }
  //   return Promise.resolve(new ErrorModel('unlogin'));
  // }
};

module.exports = userRouterHandler;