
const handlePostLogin = (username, password) => {

  if('rick' === username && '666' === password) {
    return true;
  } else {
    return false
  }
}

module.exports = { handlePostLogin }