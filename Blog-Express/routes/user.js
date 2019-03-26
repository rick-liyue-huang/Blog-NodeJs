
const express = require('express');
const router = express.Router();
const { SuccessModel, ErrorModel } = require('../model/resModel');
const { handlePostLogin } = require('../controller/user');

router.post('/login', (req, res, next) => {
  
  const { username, password } = req.body;
    
  const loginResult = handlePostLogin(username, password);
  return loginResult.then(loginData => {
    if(loginData.username) {

      // when login correctly, we can set req.session by username and realname
      req.session.username = loginData.username;
      req.session.realname = loginData.realname;

      // store req.session in redis
      // set(req.sessionId, req.session); 
      // here can get req.sessionId because if it is from promise objec in app.js
      console.log('req.session in router-user.js: ', req.session);
      res.json(
        new SuccessModel(loginData)
      )
      
    } else {
      res.json(
        new ErrorModel('unlogin router-user.js')
      )  
    }
  });
});

router.get('/login-test', (req, res, next) => {
  if(req.session.username) {
    res.json({
      errno: 0,
      msg: 'login login-test'
    });
    return
  }
  res.json({
    errno: -1,
    msg: 'unlogin login-test'
  });
})

/*
router.get('/session-test', (req, res, next) => {
  
  const session = req.session;
  if(session.viewNum == null) {
    session.viewNum = 0
  }
  session.viewNum++;
  res.json({
    viewNum: session.viewNum
  });
  
});
*/

module.exports = router;