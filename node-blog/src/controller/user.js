const { exec } = require("../db/mysql");

const handlePostUserLogin = (username, password) => {
  // if (username === "rick" && password === "123") {
  //   return true;
  // } else {
  //   return false;
  // }
  const sql = `select username, realname from users 
   where username='${username}' and password='${password}';`;
  return exec(sql).then(rows => {
    return rows[0] || {};
  });
};

module.exports = { handlePostUserLogin };
