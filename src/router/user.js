
const handleUserRouter = (req, res) => {
  
  const method = req.method;
  // const url = req.url;
  // const path = url.split('?')[0];

  // login user
  if(method === 'POST' && req.path === '/api/user/login') {
    return {
      msg: 'this is post user login interface'
    }
  }
}

module.exports = handleUserRouter;