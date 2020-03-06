const mysql = require("mysql");

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "rootroot",
  port: 3306,
  database: "myblog"
});

// 连接数据库
con.connect();

// 执行sql语句
const sql = "update users set realname='huangliyue' where id=1";
con.query(sql, (err, result) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(result);
});

// 关闭连接
con.end();
