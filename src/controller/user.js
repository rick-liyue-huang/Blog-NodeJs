
const { exec } = require('../db/mysql');

// login method
const loginCheck = (username, password) => {
  // use fork data
  // if(username === 'rick' && password === '6666') {
  //   return true
  // }
  // return false;

  const sql = `
    select username, realname from users where username='${username}' and password='${password}';
  `;
  return exec(sql).then(rows => {
    return rows[0] || {};
  });
}

module.exports = {
  loginCheck
}