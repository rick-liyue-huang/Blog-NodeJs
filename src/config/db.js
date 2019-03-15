
// environment para
const env = process.env.NODE_ENV;

let MYSQL_CONF;

if(env === 'dev') {
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: 'password',
    port: '3306',
    database: 'myblog1'
  }
}

if(env === 'production') {
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: 'password',
    port: '3306',
    database: 'myblog1'
  }
}

module.exports = {
  MYSQL_CONF
}