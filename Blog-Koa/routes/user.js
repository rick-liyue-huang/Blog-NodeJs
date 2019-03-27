
const router = require('koa-router')()
const { SuccessModel, ErrorModel } = require('../model/resModel');
const { handlePostLogin } = require('../controller/user');

router.prefix('/api/user');

router.post('/login', async (ctx, next) => {
  
  const { username, password } = ctx.request.body;
    
  const loginData = await handlePostLogin(username, password);
  if(loginData.username) {

    // when login correctly, we can set req.session by username and realname
    ctx.session.username = loginData.username;
    ctx.session.realname = loginData.realname;

    console.log('ctx.session in router-user.js: ', ctx.session);
    ctx.body = new SuccessModel(loginData);
    
  } else {
    ctx.body = new ErrorModel('unlogin router-user.js');
  }

});

/*
router.get('/session-test', async (ctx, next) => {
  if(ctx.session.viewCount == null) {
    ctx.session.viewCount = 0;
  }
  ctx.session.viewCount++;

  ctx.body = {
    errno: 0,
    viewCount: ctx.session.viewCount
  }
})
*/

module.exports = router;