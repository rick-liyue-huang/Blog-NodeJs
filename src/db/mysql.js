
const mysql = require('mysql');
// import mysql config
const { MYSQL_CONFIG } = require('../config/db');

// create connection
const connection = mysql.createConnection(MYSQL_CONFIG);
// start connect
connection.connect();

const exec = (sql) => {
  // this is one promise object
  const promise = new Promise((resolve, reject) => {
    // deal with sql sentence
    connection.query(sql, (err, res) => {
      if(err) {
        reject(err);
        return
      }
      resolve(res);
    });
  });

  return promise;
}

module.exports = { exec };