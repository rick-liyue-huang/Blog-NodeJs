
/**
 * @description user controller
 * @author Rick
 */


const { getUserInfo } = require('../services/user');
const { SuccessModel, ErrorModel } = require('../model/ResModel');
const { registerUserNameNotExistInfo } = require('../model/ErrorInfo');
 /**
  * confirm username is exist
  * @param {string} userName 
  */

async function isExist(userName) {

  // logic deal
  // call service method
  const userInfo = await getUserInfo(userName);
  if(userInfo) {
    // username is exist
    return new SuccessModel(userInfo);
  } else {
    // username isnot exist
    return new ErrorModel(registerUserNameNotExistInfo);
  }
  // return unified format
}

module.exports = {
  isExist
}

