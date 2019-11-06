
const { SuccessModel, ErrorModel } = require('../model/resModel');
const { postLoginHandler } = require('../controllers/user');

const handleUserRouter = (req, res) => {

  const method = req.method;
  
  if('POST' === method && '/api/user/login' === req.path) {
    // return {
    //   msg: 'login'
    // }
    const { username, password } = req.body;
    const loginData = postLoginHandler(username, password);
    if(loginData) {
      return new SuccessModel(loginData);
    } else {
      return new ErrorModel('un login');
    }
  }
}

module.exports = handleUserRouter;