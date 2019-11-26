const router = require('koa-router')()

router.get('/', async (ctx, next) => {

  // debugger // for inspect
  // read data from template on async way
  await ctx.render('index', {
    title: 'Hello Koa 2!',
    msg: 'hello rick',
    isMe: true,
    blogList: [
      {id: 1, title: 'aaa'},
      {id: 2, title: 'bbb'},
      {id: 3, title: 'ccc'}
    ]
  })
})


router.get('/json', async (ctx, next) => {
  const session = ctx.session;
  if(session.viewNum == null) {
    session.viewNum = 0;
  }
  session.viewNum++;

  // throw Error();
  ctx.body = {
    title: 'koa2 json'
    // viewNum: session.viewNum
  }

})

router.get('/profile/:userName/', async (ctx, next) => {
  const { userName } =  ctx.params;
  ctx.body = {
    title: 'this is profile page',
    userName
  }
});

router.get('/loadmore/:userName/:pageindex', async (ctx, next) => {
  const { userName, pageindex } = ctx.params;
  ctx.body = {
    title: 'this is loadmore page',
    userName,
    pageindex
  }
});


module.exports = router
