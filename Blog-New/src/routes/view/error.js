
/**
 * @description error 404 router
 * @author Rick
 */

 const router = require('koa-router')();

//  error
 router.get('/error', async (ctx, next) => {
   await ctx.render('error')
 });

//  404, 这是兜底的路由，如果之前的都没有匹配，就会跑到这里面。
router.get('*', async (ctx, next) => {
  await ctx.render('404');
})

 module.exports = router;