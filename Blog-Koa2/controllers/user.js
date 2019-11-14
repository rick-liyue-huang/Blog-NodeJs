
const xss = require('xss');
const { exec, escape } = require('../db/mysql');
const { genPwd } = require('../utils/cryp');

const postLoginHandler = async (username, password) => {
  // use fake data
  // if('rick' === username && '666' === password) {
  //   return true;
  // }
  // return false;

  username = xss(username);
  password = xss(password);

  // create crypto password
  password = genPwd(password);

  username = escape(username);
  password = escape(password);

  // const sql = `select username, realname from users where username='${username}' and password='${password}';`;
  const sql = `select username, realname from users where username=${username} and password=${password};`;

  const rows = await exec(sql);
  return rows[0] || {};
  
}

module.exports = {
  postLoginHandler
};