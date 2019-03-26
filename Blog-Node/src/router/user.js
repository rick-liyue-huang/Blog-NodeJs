
// import model and event on router
const { SuccessModel, ErrorModel } = require('../model/resModel');
const { handlePostLogin } = require('../controller/user');
// import set redis method
const { set } = require('../db/redis');

// deal with login router
const handleUserRouter = (req, res) => {
  if(req.method === 'POST' && req.path === '/api/user/login') {

    const { username, password } = req.body;
    
    const loginResult = handlePostLogin(username, password);
    return loginResult.then(loginData => {
      if(loginData.username) {

        // when login correctly, we can set req.session by username and realname
        req.session.username = loginData.username;
        req.session.realname = loginData.realname;

        // store req.session in redis
        set(req.sessionId, req.session); 
        // here can get req.sessionId because if it is from promise objec in app.js
        console.log('req.session in router-user.js: ', req.session);
        return new SuccessModel(loginData);
      } else {
        return new ErrorModel('unlogin router-user.js');  
      }
    });

    /*
    const loginData = handlePostLogin(username, password);
    if(loginData) {
      return new SuccessModel(loginData);
    } else {
      return new ErrorModel('unlogin router-user.js');
    }
    */
  }
};

module.exports = handleUserRouter;