
const {
  SuccessModel,
  ErrorModel
} = require('../model/resModel');
const { postUserLoginHandler } = require('../controller/user'); 

const userRouterHandler = (req, res) => {
  
  if(req.method === 'POST' && req.path === '/api/user/login') {
    
    const { username, password } = req.body;
    const loginResult = postUserLoginHandler(username, password);
    return loginResult.then(loginData => {
      if(loginData.username) {
        return new SuccessModel();
      } else {
        return new ErrorModel('login fail');
      }
    })

    /*
    const { username, password } = req.body;
    const userData = postUserLoginHandler(username, password);
    if(userData) {
      return new SuccessModel(userData);
    } else {
      return new ErrorModel('login fail');
    }
    */

    /*
    return {
      msg: 'user'
    }
    */
  }
};

module.exports = userRouterHandler;