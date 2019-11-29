
/**
 * @description user service method to query database
 * @author Rick
 */

const { User } = require('../db/model/index');
const { formatUser } = require('./_format');
console.log('User', User);

/**
 * get user information, this method can to use for login and username exist
 * @param {string} userName 
 * @param {string} password 
 */
async function getUserInfo(userName, password) {

  // query condition
  const whereOption = {
    userName
  };
  if(password) {
    Object.assign(whereOption, { password });
  }
  const result = await User.findOne({
    attributes: ['id', 'userName', 'nickName', 'picture', 'city'],
    where: whereOption
  });

  if(null == result) {
    return result // no result
  }

  // format the result data
  const formatResult = formatUser(result.dataValues);
  return formatResult;
}

/**
 * create the new user in 'users' table of blog scheme
 * @param {string} userName
 * @param {string} password
 * @param {number} gender
 * @param {string} nickName
 */
async function createUser({ userName, password, gender = 3, nickName }) {
  const result = await User.create({
    userName,
    password,
    nickName: nickName ? nickName : userName,
    gender
  });
  return result.dataValues
}

/**
 * 
 * @param {string} userName username 
 */
async function deleteUser(userName) {
  const result = await User.destroy({
    where: {
      userName
    }
  });
  // result 是 删除的行数
  return result > 0
}

module.exports = { 
  getUserInfo, createUser, deleteUser
}
