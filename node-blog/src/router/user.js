const { handlePostUserLogin } = require("../controller/user");
const { SuccessModel, ErrorModel } = require("../model/resModel");

const handleUserRouter = (req, res) => {
  const method = req.method;

  // user login
  if ("POST" === method && "/api/user/login" === req.path) {
    // return {
    //   msg: "user login"
    // };
    const { username, password } = req.body;
    // const userData = handlePostUserLogin(username, password);
    // if (userData) {
    //   return new SuccessModel();
    // } else {
    //   return new ErrorModel("unlogin");
    // }
    const userResult = handlePostUserLogin(username, password);
    return userResult.then(userData => {
      if (userData.username) {
        return new SuccessModel();
      } else {
        return new ErrorModel("unlogin");
      }
    });
  }
};

module.exports = handleUserRouter;
