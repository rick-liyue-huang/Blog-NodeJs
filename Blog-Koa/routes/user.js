const router = require('koa-router')();
const { SuccessModel, ErrorModel } = require('../model/resModel');
const { handlePostLogin } = require('../controllers/user');

router.prefix('/api/user')

router.post('/login', async (ctx, next) => {
  
  const { username, password } = ctx.request.body;

  const loginData = await handlePostLogin(username, password);

  if(loginData.username) {
    ctx.session.username = loginData.username;
    ctx.session.realname = loginData.realname;

    ctx.body = new SuccessModel(loginData);
  } else {
    ctx.body = new ErrorModel('unlogin');
  }
});

// test session
router.get('/session-test', async (ctx, next) => {
  if(ctx.session.viewnum == null) {
    ctx.session.viewnum = 0;
  }
  ctx.session.viewnum++;

  ctx.body = {
    errno: 0,
    viewnum: ctx.session.viewnum
  }
});


module.exports = router
