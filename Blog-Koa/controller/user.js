
const xss = require('xss');
// import mysql exec func
const  { exec, escape } = require('../db/mysql');
// import crypto method
const  { genPassword } = require('../utils/cryp');

const handlePostLogin = async (username, password) => {

  // avoid xss attack
  username = xss(username);
  password = genPassword(password);
  password = xss(password);
  
  // avoid sql inject attack
  username = escape(username);
  password = escape(password);

  // get data from users database; delte '' for escape in sql sentence
  const sql = `
    select username, realname from users 
    where username=${username} and password=${password};`;
  const rows = await exec(sql);
  return rows[0] || {};

  // return exec(sql).then(rows => {
  //   return rows[0] || {}
  // });

  /*
  if(username === 'rick' && password === '666') {
    return true;
  } else {
    return false;
  }
  */
};

module.exports = { handlePostLogin };