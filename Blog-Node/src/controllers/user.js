const { exec } = require('../db/mysql');

const postLoginHandler = (username, password) => {
  // use fake data
  // if('rick' === username && '666' === password) {
  //   return true;
  // }
  // return false;

  const sql = `
  select * from users where username='rick' and password='666';`;

  return exec(sql).then(rows => {
    return rows[0];
  });


}

module.exports = {
  postLoginHandler
};