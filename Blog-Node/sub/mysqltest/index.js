
const mysql = require('mysql');

const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'moon978329',
  port: '3306',
  database: 'myblog'
});

con.connect();
             
// const sql = `insert into blogs (title, content, createtime, author) values ('CC', 'Content cc', 1573017188072, 'rick')`;
// const sql = `insert into users (username, password, realname) values ('liyue', '666', 'huangliyue');`;
const sql = `select username, realname from users where username='rick' and password='666';`;

con.query(sql, (err, result) => {
  if(err) {
    console.log(err);
    return;
  }
  console.log(result);
});
con.end();