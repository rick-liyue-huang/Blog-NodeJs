const router = require('koa-router')()

router.prefix('/users')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
});

router.post('/login', async (ctx, next) => {
  const { username, password } = ctx.request.body;
  let userInfo;
  if(username === 'rick' && password === '666') {
    userInfo = {
      userId: 1,
      username: 'rick',
      nickname: 'liyue',
      gender: 1
    }
  }

  if(userInfo == null) {
    ctx.body = {
      errno: -1,
      msg: 'unlogin'
    }
    return
  }
  ctx.body = {
    errno: 0,
    data: userInfo
  }
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

module.exports = router
