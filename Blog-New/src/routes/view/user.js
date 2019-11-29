
/**
 * @description user view router config
 * @author Rick
 */

const router = require('koa-router')();

/**
 * 
 * @param {Object} ctx koa2 ctx
 */
function getLoginInfo(ctx) {
  let data = {
    isLogin: false, // default as unlogin
  }
  const userInfo = ctx.session.userInfo;
  if(userInfo) {
    data = {
      isLogin: true,
      userName: userInfo.userName
    }
  }
  return data;
}

router.get('/login', async (ctx, next) => {
  await ctx.render('login', getLoginInfo(ctx));
});

router.get('/register', async (ctx, next) => {
  await ctx.render('register', getLoginInfo(ctx));
});

module.exports = router;




 