
const handleUserRouter = (req, res) => {

  const method = req.method;
  
  if('POST' === method && '/api/user/login' === req.path) {
    return {
      msg: 'login'
    }
  }
}

module.exports = handleUserRouter;