
// import model and event on router
const { SuccessModel, ErrorModel } = require('../model/resModel');
const { handlePostLogin } = require('../controller/user');

// deal with login router
const HandleUserRouter = (req, res) => {
  if(req.method === 'POST' && req.path === '/api/user/login') {

    const { username, password } = req.body;
    const loginData = handlePostLogin(username, password);
    if(loginData) {
      return new SuccessModel(loginData);
    } else {
      return new ErrorModel('unlogin router-user.js');
    }
  }
};

module.exports = HandleUserRouter;