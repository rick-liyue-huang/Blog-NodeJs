
const mysql = require('mysql');
const { MYSQL_CONF } = require('../config/db');

// create connection object
const con = mysql.createConnection(MYSQL_CONF);

// start connect
con.connect();

// exec sql func
function exec(sql) {

  const promise = new Promise((resolve, reject) => {
    con.query(sql, (err, result) => {
      if(err) {
        reject(err);
        return
      }
      resolve(result);
    })
  })

  return promise;
}

// con.end() // keep connection open

module.exports = {
  exec
};