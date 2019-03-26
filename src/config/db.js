
// define mysql args
let ENV = process.env.NODE_ENV;
let MYSQL_CONFIG;

if(ENV === 'dev') {
  MYSQL_CONFIG = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'myblog1'
  };
}

if(ENV === 'prod') {
  MYSQL_CONFIG = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'myblog1'
  };
}

module.exports = { MYSQL_CONFIG };