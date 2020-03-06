const mysql = require("mysql");
const { MYSQL_CONFIG } = require("../config/db");

const con = mysql.createConnection(MYSQL_CONFIG);

con.connect();

//统一执行sql的函数
function exec(sql) {
  const promise = new Promise((resolve, reject) => {
    con.query(sql, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      // result: 就是 listdata
      console.log("result in exec: ", result);
      resolve(result);
    });
  });
  return promise;
}

module.exports = { exec };
