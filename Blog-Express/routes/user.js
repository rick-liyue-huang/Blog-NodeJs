
const express = require('express');
const router = express.Router();
const { SuccessModel, ErrorModel } = require('../model/resModel');
const { handlePostLogin } = require('../controllers/user');

router.post('/login', (req, res, next) => {
  
  const { username, password } = req.body;

  const loginResult = handlePostLogin(username, password);
  return loginResult.then(loginData => {

    if(loginData.username) {

      // res.setHeader('Set-Cookie', `username=${loginData.username}; path=/; httpOnly; expires=${getExpire()}`);
      req.session.username = loginData.username;
      req.session.realname = loginData.realname;

      res.json(new SuccessModel(loginData));
    } else {
      res.json(new ErrorModel('unlogin'));
    }
  });
});

router.get('/login-test', (req, res, next) => {
  if(req.session.username) {
    res.json({
      errno: 0,
      msg: 'login'
    });
    return
  }
  res.json({
    errno: -1,
    msg: 'unlogin'
  })
})

/*
router.get('/session-test', (req, res, next) => {
  const session = req.session;
  if(session.viewNum == null) {
    session.viewNum = 0;
  }
  res.json({
    viewNum: session.viewNum++
  });
})
*/


module.exports = router;