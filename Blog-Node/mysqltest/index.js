
const mysql = require('mysql');

const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'moon978329',
  port: '3306',
  database: 'myblog'
});

con.connect();
             
const sql = `insert into blogs (title, content, createtime, author) values ('CC', 'Content cc', 1573017188072, 'rick')`;
con.query(sql, (err, result) => {
  if(err) {
    console.log(err);
    return;
  }
  console.log(result);
});
con.end();