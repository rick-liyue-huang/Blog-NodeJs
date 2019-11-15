
/**
 * @description sync sequelize
 * @author rick
 */


const seq = require('./seq')

// require('./model');

// test connection
seq.authenticate().then(() => {
  console.log('auth ok')
}).catch(() => {
  console.log('auth er')
})

// sync the database to mysql
seq.sync({ force: true }).then(() => {
  console.log('sync ok')
  process.exit()
})

