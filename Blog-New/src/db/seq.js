
/**
 * @description sequelize instance
 * @author Rick
 */

const Sequelize = require('sequelize');
const { MYSQL_CONFIG } = require('../conf/db');
const { isProd } = require('../utils/env');

// decompose
const { host, port, user, password, database } = MYSQL_CONFIG;

const conf = {
  host,
  dialect: 'mysql'
}

// will use on the 'production' environment 
if(isProd) {
  conf.pool = {
    max: 6, // the maximum connection number in pool
    min: 0,
    idle: 10000, // the connect will be release after idle 10s
  };
}

// if on test environment, donot print matched sql statement
if(isTest) {
  conf.logging = () => {}
}

const seq = new Sequelize(database, user, password, conf);


module.exports = seq;
