
const redis = require('redis');
const { REDIS_CONFIG } = require('../config/db');

// create redis client
const redisClient = redis.createClient(REDIS_CONFIG.port, REDIS_CONFIG.host);
// deal with err event
redisClient.on('error', err => {
  console.log(err);
});

// define two methods to export
const set = (key, val) => {
  if(typeof val === 'object') {
    val = JSON.stringify(val);
  }
  redisClient.set(key, val, redis.print);
}

// set method return promise
const get = (key) => {
  const promise = new Promise((resolve, reject) => {
    redisClient.get(key, (err, val) => {
      if(err) {
        reject(err);
        return;
      }
      if(val == null) {
        resolve(null);
        return
      }

      try {
        resolve(JSON.parse(val));
      } catch {
        resolve(val);
      }
    });
  });

  return promise; // notice here
}

module.exports = { set, get };