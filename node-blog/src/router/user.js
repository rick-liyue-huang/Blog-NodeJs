const { handlePostUserLogin } = require("../controller/user");
const { SuccessModel, ErrorModel } = require("../model/resModel");

// const setCookieExpires = () => {
//   const d = new Date();
//   d.setTime(d.getTime() + 24 * 60 * 60 * 1000);
//   return d.toGMTString();
// };

const handleUserRouter = (req, res) => {
  const method = req.method;

  // user login
  if ("GET" === method && "/api/user/login" === req.path) {
    // return {
    //   msg: "user login"
    // };
    const { username, password } = req.query;
    // const userData = handlePostUserLogin(username, password);
    // if (userData) {
    //   return new SuccessModel();
    // } else {
    //   return new ErrorModel("unlogin");
    // }
    const userResult = handlePostUserLogin(username, password);
    return userResult.then(userData => {
      if (userData.username) {
        // 操作cookie
        // res.setHeader(
        //   "Set-Cookie",
        //   `username=${
        //     userData.username
        //   }; path=/; httpOnly; expires=${setCookieExpires()}`
        // );
        req.session.username = userData.username;
        req.session.realname = userData.realname;
        return new SuccessModel();
      } else {
        return new ErrorModel("unlogin");
      }
    });
  }

  if (method === "GET" && req.path === "/api/user/login-test") {
    if (/*req.cookie.username */ req.session.username) {
      return Promise.resolve(
        new SuccessModel({
          username: req.cookie.username
        })
      );
    }
    return Promise.resolve(new ErrorModel("unlogin test"));
  }
};

module.exports = handleUserRouter;
