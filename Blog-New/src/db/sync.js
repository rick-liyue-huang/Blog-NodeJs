
/**
 * @description sequelize sync with database
 * @author Rick
 */

const seq = require('./seq');

// sync the data model
require('./model/index');

// test connect

seq.authenticate().then(() => {
  console.log('ok')
}).catch(() => {
  console.log('no connect');
});

// execute sync
seq.sync({ force: true }).then(() => {
  console.log('sync ok');
  process.exit();
});