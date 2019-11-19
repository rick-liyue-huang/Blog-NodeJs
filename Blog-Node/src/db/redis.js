
const redis = require('redis');
const { REDIS_CONFIG } = require('../config/db');

const redisClient = redis.createClient(REDIS_CONFIG.port, REDIS_CONFIG.host);

redisClient.on('error', err => {
  console.log(err);
});

function set(key, val) {
  if('object' === typeof val) {
    val = JSON.stringify(val);
  }
  redisClient.set(key, val, redis.print);
}

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