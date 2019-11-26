
/**
 * @description mysql redis config
 * @author Rick
 */

const { isProd } = require('../utils/env');


let REDIS_CONFIG = {
  port: 6379,
  host: '127.0.0.1'
};
let MYSQL_CONFIG = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'abc123456',
  database: 'blog'
};

if(isProd) {
  REDIS_CONFIG = {
    port: 6379,
    host: '127.0.0.1'
  };
  MYSQL_CONFIG = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'abc123456',
    database: 'blog'
  };
}

module.exports = {
  REDIS_CONFIG, MYSQL_CONFIG
}