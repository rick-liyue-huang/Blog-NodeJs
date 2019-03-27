
const redis = require('redis');
const { REDIS_CONFIG } = require('../config/db');

// create redis client
const redisClient = redis.createClient(REDIS_CONFIG.port, REDIS_CONFIG.host);
// deal with err event
redisClient.on('error', err => {
  console.log(err);
});

module.exports = redisClient;