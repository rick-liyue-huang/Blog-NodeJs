
/**
 * @description store config
 * @author rick
 */

const { isPrd } = require('../utils/env');
 
let REDIS_CONFIG = {
  port: 6379,
  host: '127.0.0.1'
};

if(isPrd) {
  REDIS_CONFIG = {
    port: 6379,
    host: '127.0.0.1'
  };
}

 module.exports = {
   REDIS_CONFIG
 }