
/**
 * @description user controller
 * @author Rick
 */

const { getUserInfo, createUser } = require('../services/user');
const { SuccessModel, ErrorModel } = require('../model/ResModel');
const { registerUserNameNotExistInfo, registerUserNameExistInfo,
  registerFailInfo, loginFailInfo } = require('../model/ErrorInfo');
const { genPwd } = require('../utils/cryp');

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

/**
 *  register mehtod
 * @param {string} userName
 * @param {string} password
 * @param {number} gender  
 */
async function register({userName, password, gender}) {
  const userInfo = await getUserInfo(userName);
  if(userInfo) {
    // username is exist, 在创建数据库的时候有unique也有存在的报错信息
    return new ErrorModel(registerUserNameExistInfo);
  }

  // register service
  try {
    await createUser({
      userName,
      // create the ciphar password
      password: genPwd(password),
      gender
    });
    return new SuccessModel()
  } catch (e) {
    console.log(e.message, e.stack);
    return new ErrorModel(registerFailInfo);
  }
}

/**
 * 
 * @param {Object} ctx koa2 ctx
 * @param {string} userName 
 * @param {string} password 
 */
async function login(ctx, userName, password) {
  // login successfull, and then ctx.session.userInfo = xxx
  // cryp the password
  const userInfo = await getUserInfo(userName, genPwd(password));
  if(!userInfo) {
    // login fail
    return new ErrorModel(loginFailInfo);
  }

  // login successfully
  if(null == ctx.session.userInfo) {
    ctx.session.userInfo = userInfo;
  }
  return new SuccessModel();
}

module.exports = {
  isExist, register, login
}

