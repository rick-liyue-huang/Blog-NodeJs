
const { exec } = require('../db/mysql');
 
const postUserLoginHandler = (username, password) => {

  const sql = `
    select username, realname from users 
    where username='${username}' and password='${password}';`;
  return exec(sql).then(rows => {
    return rows[0] || {};
  });

  // if(username === 'rick' && password === '666') {
  //   return true;
  // }
  // return false;
}

module.exports = { postUserLoginHandler }