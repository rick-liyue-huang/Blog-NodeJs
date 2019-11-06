
const postLoginHandler = (username, password) => {
  // use fake data
  if('rick' === username && '666' === password) {
    return true;
  }
  return false;
}

module.exports = {
  postLoginHandler
};