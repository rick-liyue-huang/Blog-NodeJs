
const express = require('express');
const router = express.Router();
const { SuccessModel, ErrorModel } = require('../model/resModel');
const { postLoginHandler } = require('../controllers/user');

router.post('/login', (req, res, next) => {
  
  const { username, password } = req.body;

  const loginResult = postLoginHandler(username, password);
  return loginResult.then(loginData => {
    console.log('loginData: ------- ', loginData);
    if(loginData.username) {
      // 设置session
      req.session.username = loginData.username;
      req.session.realname = loginData.realname;

      console.log('req.session: ------ ', req.session);

      res.json(new SuccessModel(loginData));
      return
    } else {
      res.json(new ErrorModel('unlogin'));
      return
    }
  });
});

router.get('/login-test', (req, res, next) => {
  if(req.session.username) {
    res.json({
      errno: 0,
      msg: 'logined'
    });
    return
  }
  res.json({
    errno: -1,
    msg: 'unlogin'
  })
})

router.get('/session-test', (req, res, next) => {
  const session = req.session;
  if(session.viewNum == null) {
    session.viewNum = 0;
  }
  session.viewNum++;
  res.json({
    viewNum: session.viewNum
  });
});

module.exports = router;