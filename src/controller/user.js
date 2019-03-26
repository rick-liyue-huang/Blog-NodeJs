
// import mysql exec func
const  { exec } = require('../db/mysql');

const handlePostLogin = (username, password) => {
  
  // get data from users database
  const sql = `
    select username, realname from users 
    where username='${username}' and password='${password}';`;
  return exec(sql).then(rows => {
    return rows[0] || {}
  });

  /*
  if(username === 'rick' && password === '666') {
    return true;
  } else {
    return false;
  }
  */
};

module.exports = { handlePostLogin };