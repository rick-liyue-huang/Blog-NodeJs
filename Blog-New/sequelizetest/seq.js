
const Sequelize = require('sequelize');

const conf = {
  host: 'localhost',
  dialect: 'mysql'
}
const seq = new Sequelize('blog', 'root', 'abc123456', conf);


module.exports = seq;
