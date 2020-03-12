const xss = require("xss");
const { exec, escape } = require("../db/mysql");
const { generatePassword } = require("../utils/cryp");

const handlePostUserLogin = (username, password) => {
  // if (username === "rick" && password === "123") {
  //   return true;
  // } else {
  //   return false;
  // }

  password = generatePassword(password);
  username = escape(username);
  password = escape(password);

  const sql = `select username, realname from users 
   where username=${username} and password=${password};`;
  console.log("sql: ", sql);
  return exec(sql).then(rows => {
    return rows[0] || {};
  });
};

module.exports = { handlePostUserLogin };
