
// cryp file for password

const crypto = require('crypto');

// crypt
const SECRECT_KEY = 'RickHuang666';

// md5
const md5 = (content) => {
  let md5 = crypto.createHash('md5');
  return md5.update(content).digest('hex')
}

// execute crypto
const genPassword = (password) => {
  const str = `password=${password}&key=${SECRECT_KEY}`;
  return md5(str);
}

// const result = genPassword('666'); // 0c7ea452593b2dfa8850965f50be1038
// console.log(result);

module.exports = { genPassword };