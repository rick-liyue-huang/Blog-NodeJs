
// deal with crypto method
const crypto = require('crypto');
const SECRECT_KEY = 'RickHuang666';

const md5 = (content) => {
  return crypto.createHash('md5').update(content).digest('hex');
}

const genPassword = (password) => {
  const str = `password=${password}&key=${SECRECT_KEY}`;
  return md5(str);
}

module.exports = { genPassword };

