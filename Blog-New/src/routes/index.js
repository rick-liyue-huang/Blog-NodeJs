const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
});

// config params in url
router.get('/profile/:username', async (ctx, next) => {
  const { username } = ctx.params; 
  ctx.body = {
    title: `this is profile page of ${username}!!`
  }
});

// config more params in url
router.get('/loadMore/:username/:pageIndex', async (ctx, next) => {
  const { username, pageIndex } = ctx.params;
  ctx.body = {
    title: `this is profile page of ${username} and ${pageIndex}!!`
  }
})

module.exports = router
