
const xss = require('xss');
const { exec, escape } = require('../db/mysql');
const { genPsd } = require('../utils/cryp');

const handlePostLogin = async (username, password) => {

  /*
  if('rick' === username && '666' === password) {
    return true;
  } else {
    return false
  }
  */

  password = genPsd(password);
  
  username = xss(username);
  password = xss(password);

  username = escape(username);
  password = escape(password);

  const sql = `select username, realname from users 
   where username=${username} and password=${password};`;
  
  const rows = await exec(sql);
  return rows[0] || {};
  
}

module.exports = { handlePostLogin }