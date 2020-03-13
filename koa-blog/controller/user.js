const xss = require("xss");
const { exec, escape } = require("../db/mysql");
const { generatePassword } = require("../utils/cryp");

const handlePostUserLogin = async (username, password) => {
  password = generatePassword(password);
  username = escape(username);
  password = escape(password);

  const sql = `select username, realname from users 
   where username=${username} and password=${password};`;
  console.log("sql: ", sql);
  const rows = await exec(sql);
  return rows[0] || {};
};

module.exports = { handlePostUserLogin };
