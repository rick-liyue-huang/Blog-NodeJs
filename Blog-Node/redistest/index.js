
const redis = require('redis');

// create client
const redisClient = redis.createClient(6379, '127.0.0.1');
redisClient.on('error', err => {
  console.log(err);
});

// test
redisClient.set('myname', 'rickkk', redis.print);
redisClient.get('myname', (err, val) => {
  if(err) {
    console.log(err);
    return
  }
  console.log('val', val);

  redisClient.quit();
});


