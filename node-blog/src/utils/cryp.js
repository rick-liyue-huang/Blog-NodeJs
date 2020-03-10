const crypto = require("crypto");

// secret key
const SECRET_KEY = `RICKHUANG_123456`;

// md5
const md5 = content => {
  let md5 = crypto.createHash("md5");
  return md5.update(content).digest("hex");
};

// crypto func
const generatePassword = password => {
  const str = `password=${password}&key=${SECRET_KEY}`;
  return md5(str);
};

const res = generatePassword("666");
console.log(res);

module.exports = { generatePassword };
