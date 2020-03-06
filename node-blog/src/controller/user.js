const handlePostUserLogin = (username, password) => {
  if (username === "rick" && password === "123") {
    return true;
  } else {
    return false;
  }
};

module.exports = { handlePostUserLogin };
