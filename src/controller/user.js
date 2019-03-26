
const handlePostLogin = (username, password) => {
  if(username === 'rick' && password === '666') {
    return true;
  } else {
    return false;
  }
};

module.exports = { handlePostLogin };