
const redis = require('redis');
const { REDIS_CONFIG } = require('../config/db');

const redisClient = redis.createClient(REDIS_CONFIG.port, REDIS_CONFIG.host);
redisClient.on('error', err => {
  console.log(err);
});

// encapsulate func
const set = (key, val) => {
  if(typeof val === 'object') {
    val = JSON.stringify(val);
  }
  redisClient.set(key, val, redis.print);
}

const get = (key) => {
  // get val by async
  const promise = new Promise((resolve, reject) => {
    redisClient.get(key, (err, val) => {
      if(err) {
        reject(err)
        return
      }
      
      if(val == null) {
        resolve(null);
        return
      }

      // try-catch to get compatible val format
      try {
        // for val is json format
        resolve(JSON.parse(val));
      } catch(ex) {
        resolve(val);
      }

      //  keep redis client connected
    })

  });

  return promise;
}

module.exports = { set, get };