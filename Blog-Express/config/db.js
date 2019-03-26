
// define mysql args
let ENV = process.env.NODE_ENV;
let MYSQL_CONFIG;
let REDIS_CONFIG;

if(ENV === 'dev') {
  MYSQL_CONFIG = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'myblog1'
  };

  REDIS_CONFIG = {
    host: '127.0.0.1',
    port: 6379
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

  REDIS_CONFIG = {
    host: '127.0.0.1',
    port: 6379
  };
}

module.exports = { MYSQL_CONFIG, REDIS_CONFIG };