
const { SuccessModel, ErrorModel } = require('../model/resModel');
const { handlePostLogin } = require('../controllers/user');

const handleUserRouter = (req, res) => {

  let method = req.method;
  method = method.toLowerCase();

  if('post' === method && '/api/user/login') {
    // return {
    //   msg: 'login'
    // }

    const { username, password } = req.body;

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
        return new SuccessModel(loginData);
      } else {
        return new ErrorModel('unlogin');
      }
    });
  }
}

module.exports = handleUserRouter;