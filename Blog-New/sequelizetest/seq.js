
const Sequelize = require('sequelize');

const conf = {
  host: 'localhost',
  dialect: 'mysql'
}

// will use on the 'production' environment 
conf.pool = {
  max: 6, // the maximum connection number in pool
  min: 0,
  idle: 10000, // the connect will be release after idle 10s
  
}
const seq = new Sequelize('blog', 'root', 'abc123456', conf);


module.exports = seq;
