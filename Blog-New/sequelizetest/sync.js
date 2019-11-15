
const seq = require('./seq');

require('./model');

// test connection

seq.authenticate().then(() => {
  console.log('auth ok')
}).catch(() => {
  console.log('auth er');
});

seq.sync({ force: true }).then(() => {
  console.log('sync ok');
  process.exit()
})

