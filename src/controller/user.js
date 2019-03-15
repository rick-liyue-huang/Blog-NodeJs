
// login method
const loginCheck = (username, password) => {
  // use fork data
  if(username === 'rick' && password === '666') {
    return true;
  }

  return false;
}

module.exports = {
  loginCheck
}