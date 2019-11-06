
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

    const result = handleUserRouter('rick', '666');
    // console.log(userResult);
    return result.then(data => {
      return new SuccessModel();
    })
  }
}

module.exports = handleUserRouter;