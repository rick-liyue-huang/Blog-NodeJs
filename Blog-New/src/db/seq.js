
/**
 * @description sequelize instance
 * @author rick
 */

const Sequelize = require('sequelize')
const { MYSQL_CONFIG } = require('../config/db')
   
const { isPrd, isTest } = require('../utils/env')

const { host, user, password, database } = MYSQL_CONFIG
const config = {
  host: host,
  dialect: 'mysql'
}

// for production environment
if(isPrd) {
  config.pool = {
    max: 6, // the maximum coonect count in pool
    min: 0,
    idle: 10000 // 如果一个连接池 10s 没有使用，就释放
  }
}

// for test environment
if(isTest) {
  config.logging = () => {} // donot print sql statement
}


// for dev environment
const seq = new Sequelize(database, user, password, config)


module.exports = seq