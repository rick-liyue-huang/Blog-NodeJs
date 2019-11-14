
const router = require('koa-router')();
const { SuccessModel, ErrorModel } = require('../model/resModel');
const { postLoginHandler } = require('../controllers/user');

router.prefix('/api/user');

router.post('/login', async (ctx, next) => {
  
  const { username, password } = ctx.request.body;

  const loginData = await postLoginHandler(username, password);
  if(loginData.username) {
    // 设置session
    ctx.session.username = loginData.username;
    ctx.session.realname = loginData.realname;

    console.log('ctx.session: ------ ', ctx.session);

    ctx.body = new SuccessModel(loginData);
    return
  } else {
    ctx.body = new ErrorModel('unlogin');
    return
  }
  
});

/*
router.get('/session-test', async (ctx, next) => {
  if(ctx.session.viewCount == null) {
    ctx.session.viewCount = 0
  }
  ctx.session.viewCount++;
  ctx.body = {
    errno: 0,
    viewCount: ctx.session.viewCount
  }
})
*/

module.exports = router;