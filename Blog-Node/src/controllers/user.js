
const { exec } = require('../db/mysql');

const handlePostLogin = (username, password) => {

  /*
  if('rick' === username && '666' === password) {
    return true;
  } else {
    return false
  }
  */

  const sql = `select username, realname from users 
   where username='${username}' and password='${password}';`;
  
  return exec(sql).then(rows => {
    return rows[0] || {};
  });
}

module.exports = { handlePostLogin }