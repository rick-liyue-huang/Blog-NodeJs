
const crypto = require('crypto');

// secret key
const SECRET_KEY = 'rick.liyue.huang@gmail.com';

function md5(content) {
  let md5 = crypto.createHash('md5');
  return md5.update(content).digest('hex');
}

// create function to generate crypted password
function genPsd(password) {
  const str = `password=${password}&key=${SECRET_KEY}`;
  return md5(str);
}

console.log(genPsd('666'));

module.exports = { genPsd }