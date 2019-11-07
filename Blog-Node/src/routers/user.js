
const { SuccessModel, ErrorModel } = require('../model/resModel');
const { postLoginHandler } = require('../controllers/user');

const handleUserRouter = (req, res) => {

  const method = req.method;
  
  if('POST' === method && '/api/user/login' === req.path) {
    // return {
    //   msg: 'login'
    // }

    const { username, password } = req.body;
    // const loginData = postLoginHandler(username, password);
    // if(loginData) {
    //   return new SuccessModel(loginData);
    // } else {
    //   return new ErrorModel('un login');
    // }

    const loginResult = postLoginHandler(username, password);
    return loginResult.then(loginData => {
      console.log('loginData: ------- ', loginData);
      if(loginData.username) {
        return new SuccessModel(loginData);
      } else {
        return new ErrorModel('unlogin');
      }
    });
  }
}

module.exports = handleUserRouter;