
/**
 * @description store config
 * @author rick
 */

const { isPrd } = require('../utils/env')

let REDIS_CONFIG = {
  port: 6379,
  host: '127.0.0.1'
}

let MYSQL_CONFIG = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'moon978329',
  database: 'newmyblog'
}

if(isPrd) {
  REDIS_CONFIG = {
    port: 6379,
    host: '127.0.0.1'
  }
  MYSQL_CONFIG = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'moon978329',
    database: 'newmyblog'
  }
}

module.exports = {
  REDIS_CONFIG,
  MYSQL_CONFIG
}