
const router = require('koa-router')()

router.prefix('/users')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
});

router.post('/login', async (ctx, next) => {
  const { username, password } = ctx.request.body;
  ctx.body = {
    username,
    password
  }
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

module.exports = router



// using JWT to realize login
/*
const router = require('koa-router')();
const jwt = require('jsonwebtoken');
const { SECRET } = require('../conf/constants');
const util = require('util');
const verify = util.promisify(jwt.verify);

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

  // crypt userInfo
  let token;
  if(userInfo) {
    token = jwt.sign(userInfo, SECRET, {expiresIn: '1h'});
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
    data: token
  }
})

// 获取用户信息
router.get('/getuserinfo', async (ctx, next) => {

  const token = ctx.headers.authorization;
  try {
    const payload = await verify(token.split(' ')[1], SECRET);
    ctx.body = {
      errno: 0,
      userInfo: payload
    }
  }catch (e) {
    ctx.body = {
      errno: -1,
      msg: 'unlogin'
    }
  }
  
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

module.exports = router

*/


