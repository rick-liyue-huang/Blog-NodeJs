
const env = process.env.NODE_ENV; // environment parameter

let MYSQL_CONFIG;

if(env === 'dev') {
  MYSQL_CONFIG = {
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: 'password',
    database: 'myblog1'
  }
}

if(env === 'production') {
  MYSQL_CONFIG = {
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: 'password',
    database: 'myblog1'
  }
}

module.exports = { MYSQL_CONFIG };