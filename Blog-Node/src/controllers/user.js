const { exec } = require('../db/mysql');

const postLoginHandler = (username, password) => {
  // use fake data
  // if('rick' === username && '666' === password) {
  //   return true;
  // }
  // return false;

  const sql = `select username, realname from users where username='${username}' and password='${password}';`;
  return exec(sql).then(rows => {
    return rows[0]
  });


}

module.exports = {
  postLoginHandler
};