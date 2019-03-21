
const mysql = require('mysql');
const { MYSQL_CONFIG } = require('../config/db');

// create connection object
const con = mysql.createConnection(MYSQL_CONFIG);

// start connect
con.connect();

// execute sql function
function exec(sql) {
  const promise = new Promise((resolve, reject) => {
    con.query(sql, (err, result) => {
      if(err) {
        reject(err);
        return
      }
      resolve(result);
    });
  });
  return promise;

  // has to keep the con connected, to query frequently
}

module.exports = { exec, escape: mysql.escape };

