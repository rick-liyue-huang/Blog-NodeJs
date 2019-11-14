
const router = require('koa-router')();
const { SuccessModel, ErrorModel } = require('../model/resModel');
const {
  getListHandler,
  getDetailHandler,
  postNewHandler,
  postUpdateHandler,
  postDelHandler,
} = require('../controllers/blog');
const loginCheck = require('../middlewares/loginCheck');

router.prefix('/api/blog');

router.get('/list', async (ctx, next) => {

  let author = ctx.query.author || '';
  const keyword = ctx.query.keyword || '';

  if(ctx.query.isadmin) {
    // admin page

    console.log('is admin');
    
    if(null == ctx.session.username) {
      // unlogin
      console.error('is admin but not login');
      ctx.body = new ErrorModel('unlogin - blog');
      return
    }
    // otherwise 
    author = ctx.session.username;
  }

  const listData = await getListHandler(author, keyword);
  ctx.body = new SuccessModel(listData)

});

router.get('/detail', async (ctx, next) => {

  const detailData = await getDetailHandler(ctx.query.id);
  ctx.body = new SuccessModel(detailData);

});

router.post('/new', loginCheck, async (ctx, next) => {

  ctx.request.body.author = req.session.username;
  const newData = await postNewHandler(ctx.request.body);
  ctx.body = new SuccessModel(newData);

});

router.post('/update', loginCheck, async (ctx, next) => {

  const updateData = await postUpdateHandler(ctx.query.id, ctx.request.body);
  if(updateData) {
    ctx.body =new SuccessModel(updateData);
  } else {
    ctx.body = new ErrorModel('un update');
  }
  

});

router.post('/del', loginCheck, async (ctx, next) => {

  const author = ctx.session.username;
  const delData = await postDelHandler(ctx.query.id, author);
  if(delData) {
    ctx.body = new SuccessModel(delData);
  } else {
    ctx.body = new ErrorModel('un update');
  }
});

module.exports = router;