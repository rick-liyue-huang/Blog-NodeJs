
/**
 * @description mysql redis config
 * @author Rick
 */

const { isProd } = require('../utils/env');


let REDIS_CONFIG = {
  port: 6379,
  host: '127.0.0.1'
};
let MYSQL_CONFIG;

if(isProd) {
  REDIS_CONFIG = {
    port: 6379,
    host: '127.0.0.1'
  };
}

module.exports = {
  REDIS_CONFIG
}