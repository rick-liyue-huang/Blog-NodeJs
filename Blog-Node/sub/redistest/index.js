
const redis = require('redis');
const { REDIS_CONFIG } = require('../../src/config/db');

const redisClient = redis.createClient(6379 , '127.0.0.1');

redisClient.on('error', err => {
  console.log(err);
});

redisClient.set('key', 'val', redis.print);

redisClient.get('key', (err, val) => {
  if(err) {
    console.log(err);
    return
  }
  console.log('val: ', val);

});

redisClient.quit();