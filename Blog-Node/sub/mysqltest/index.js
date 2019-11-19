
const mysql = require('mysql');
const { MYSQL_CONFIG } = require('../../src/config/db');

const con = mysql.createConnection(MYSQL_CONFIG);

con.connect();

let sql = `insert into blogs (title, content, createtime, author) values ('CC', 'CC', 1574127700510, 'claire')`;
con.query(sql, (err, data) => {
  if(err) {
    console.log(err);
  }
  console.log(data);
});

con.end();

