
const Sequelize = require('sequelize');
const config = {
  host: 'localhost',
  dialect: 'mysql'
};

// for production environment
// config.pool = {
//   max: 6, // the maximum coonect count in pool
//   min: 0,
//   idle: 10000 // 如果一个连接池 10s 没有使用，就释放
// }

// for dev environment
const seq = new Sequelize('newmyblog', 'root', 'moon978329', config);


module.exports = seq;