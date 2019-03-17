
const { loginCheck } = require('../controller/user');
const { SuccessModel, ErrorModel } = require('../model/resModel');

const userRouterHandler = (req, res) => {
  
  const method = req.method;
  // const url = req.url;
  // const path = url.split('?')[0];

  // login user
  if(method === 'POST' && req.path === '/api/user/login') {
    const { username, password } = req.body;
    const result = loginCheck(username, password);
    if(result) {
      return new SuccessModel();
    }
    return new ErrorModel('login fail');
    // return {
    //   msg: 'this is post user login interface'
    // }
  }
}

module.exports = userRouterHandler;