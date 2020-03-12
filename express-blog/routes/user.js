const express = require("express");
const router = express.Router();
const { handlePostUserLogin } = require("../controller/user");
const { SuccessModel, ErrorModel } = require("../model/resModel");

router.post("/login", (req, res, next) => {
  const { username, password } = req.body;

  const userResult = handlePostUserLogin(username, password);
  return userResult.then(userData => {
    if (userData.username) {
      req.session.username = userData.username;
      req.session.realname = userData.realname;
      // 不需要同步都redis
      res.json(new SuccessModel());
    } else {
      res.json(new ErrorModel("unlogin"));
    }
  });
});

router.get("/login-test", (req, res, next) => {
  if (req.session.username) {
    res.json({
      errno: 0,
      msg: "login success"
    });
    return;
  }
  res.json({
    errno: -1,
    msg: "unlogin test"
  });
});

router.get("/session-test", (req, res, next) => {
  const session = req.session;
  if (session.viewNum == null) {
    session.viewNum = 0;
  }
  session.viewNum++;
  res.json({
    viewNum: session.viewNum
  });
});

module.exports = router;
