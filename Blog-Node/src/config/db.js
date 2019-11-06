
const env = process.env.NODE_ENV;

let MYSQL_CONFIG;

if('dev' === env) {
  MYSQL_CONFIG = {
    host: 'localhost',
    user: 'root',
    password: 'moon978329',
    port: '3306',
    database: 'myblog'
  };
}

if('production' === env) {
  MYSQL_CONFIG = {
    host: 'localhost',
    user: 'root',
    password: 'moon978329',
    port: '3306',
    database: 'myblog'
  };
}

module.exports = { MYSQL_CONFIG };

