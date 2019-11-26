
/**
 * @description exec redis in node.js environment
 * @author Rick
 */

const redis = require('redis');
const { REDIS_CONFIG } = require('../conf/db');

const redisClient = redis.createClient(REDIS_CONFIG.port, REDIS_CONFIG.host);

redisClient.on('error', err => {
  console.log(err);
});

/**
* @description redis set method
* @param {string} key 
* @param {string} val 
* @param {number} timeout 
*/
function set(key, val, timeout = 60 * 60) {
  if('object' === typeof val) {
    val = JSON.stringify(val);
  }
  redisClient.set(key, val, redis.print);
  redisClient.expire(key, timeout);
}

/**
* @description redis get mehtod
* @param {string} key 
*/
function get(key) {
  const promise = new Promise((resolve, reject) => {
    redisClient.get(key, (err, val) => {
      if(err) {
        reject(err);
        return
      }
      if(null == val) {
        resolve(null);
        return
      }
      try {
        resolve(JSON.parse(val));
      } catch (e) {
        resolve(val);
      }
    });
  });
  return promise;

}

module.exports = { set, get }