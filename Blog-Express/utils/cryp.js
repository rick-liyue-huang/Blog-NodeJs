
const crypto = require('crypto');

// key
const SECRET_KEY = 'rickliyuehuang_666!';

// md5
const md5 = (content) => {
  let md5 = crypto.createHash('md5');
  return md5.update(content).digest('hex');
}

const genPwd = (pwd) => {
  const str = `password=${pwd}&key=${SECRET_KEY}`;
  return md5(str);
}

console.log(genPwd('666'));

module.exports = { genPwd };