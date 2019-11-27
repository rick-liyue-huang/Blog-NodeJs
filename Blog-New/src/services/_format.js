
/**
 * @description data format
 * @author Rick
 */

const  { DEFAULT_PICTURE } = require('../conf/constants');
console.log(DEFAULT_PICTURE);
 /**
  * format the user default picture
  * @param {Object} obj user object 
  */
function _formatUserPicture(obj) {
  if(null == obj.picture) {
    obj.picture = DEFAULT_PICTURE;
  }
  return obj;
}

/**
 * format the whole user info
 * @param {Array|Object} list users list or single user
 */
function formatUser(list) {
  if(null == list) {
    return
  }
  if(list instanceof Array) {
    // get users list
    return list.map(_formatUserPicture);
  }
  // get single user
  return _formatUserPicture(lost);
}


module.exports = {
  formatUser
}



