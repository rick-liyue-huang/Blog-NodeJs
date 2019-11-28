
/**
 * @description crypto mehtod on password
 * @author Rick
 */

const crypto = require('crypto');
const { CRYPTO_SECRET_KEY } = require('../conf/secret');

// define SECRET
const SECRET = CRYPTO_SECRET_KEY;

/**
 * to get cipher text
 * @param {string} plain text 
 */
function md5(content) {
  const md5 = crypto.createHash('md5');
  return md5.update(content).digest('hex');
}

/**
 * to get ciphar password
 * @param {string} password plain text
 */
function genPwd(password) {
  const str = `password=${password}&key=${CRYPTO_SECRET_KEY}`;
  return md5(str);
}

module.exports = { genPwd }

