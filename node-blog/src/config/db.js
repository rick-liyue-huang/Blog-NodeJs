const env = process.env.NODE_ENV; //环境参数

let MYSQL_CONFIG = {};

if ("dev" === env) {
  MYSQL_CONFIG = {
    host: "localhost",
    user: "root",
    password: "rootroot",
    port: 3306,
    database: "myblog"
  };
}

if ("production" === env) {
  MYSQL_CONFIG = {
    host: "localhost",
    user: "root",
    password: "rootroot",
    port: 3306,
    database: "myblog"
  };
}

module.exports = { MYSQL_CONFIG };
