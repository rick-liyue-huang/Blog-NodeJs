
const { exec, escape } = require('../db/mysql');
// password crypto
const { genPassword } = require('../utils/cryp');
 
const postUserLoginHandler = (username, password) => {

  // avoid sql inject attack
  username = escape(username);
  // create crypto password
  password = genPassword(password);
  // avoid sql inject attack
  password = escape(password);
  

  // const sql = `
  //   select username, realname from users 
  //   where username='${username}' and password='${password}';`;
  const sql = `
    select username, realname from users 
    where username=${username} and password=${password};`;

  console.log('sql: ', sql);

  return exec(sql).then(rows => {
    return rows[0] || {};
  });

  // if(username === 'rick' && password === '666') {
  //   return true;
  // }
  // return false;
}

module.exports = { postUserLoginHandler }