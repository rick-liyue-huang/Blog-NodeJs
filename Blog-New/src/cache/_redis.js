
/**
 * @description connect with redis
 * @author rick
 */

 const redis = require('redis');
 const { REDIS_CONFIG } = require('../config/db');

//  create redis client
const redisClient = redis.createClient(REDIS_CONFIG.port, REDIS_CONFIG.host);

redisClient.on('error', err => {
  console.log(err);
});

/**
 * @description set redis
 * @param {string} key 
 * @param {string} val 
 * @param {number} timeout unit s
 */
const set = (key, val, timeout = 60 * 60) => {
   if('object' === typeof val) {
     val = JSON.stringify(val);
   }
   redisClient.set(key, val, redis.print);
   redisClient.expire(key, timeout);
}

/**
 * @description redis get
 * @param {string} key 
 */
const get = (key) => {
  const promise = new Promise((resolve, reject) => {

    redisClient.get(key, (err, val) => {
      if(err) {
        reject(err);
        return
      }
      if(val == null) {
        resolve(null);
        return
      }
      try {
        resolve(JSON.parse(val));
      } catch (e) {
        resolve(val)
      }
    });
  });
  return promise;
}

module.exports = { set, get }