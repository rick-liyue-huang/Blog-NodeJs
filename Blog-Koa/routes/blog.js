const router = require('koa-router')();
const { SuccessModel, ErrorModel } = require('../model/resModel');
const {
  handleGetList, handleGetDetail,
  handlePostNew, handlePostUpdate, handlePostDel
} = require('../controllers/blog');
const loginCheck = require('../middlewares/logincheck');

router.prefix('/api/blog')

router.get('/list', async (ctx, next) => {
  let author = ctx.query.author || '';
  const keyword = ctx.query.keyword || '';

  if(ctx.query.isadmin) {
    console.log('this is admin');
    if(ctx.session.username == null) {
      ctx.body = new ErrorModel('unlogin---');
      return
    }
    author = ctx.session.username;
  }
  
  const listData = await handleGetList(author, keyword);
  // console.log('listResult: ', listResult);
  ctx.body = new SuccessModel(listData);
  
});

router.get('/detail', async (ctx, next) => {
  const detailData = await handleGetDetail(ctx.query.id);
  ctx.body = new SuccessModel(detailData);
  
});

router.post('/new', loginCheck, async (ctx, next) => {

  ctx.request.body.author = ctx.session.username;
  const newData = await handlePostNew(ctx.request.body);
  ctx.body = new SuccessModel(newData);
  
});

router.post('/update', loginCheck, async (ctx, next) => {
  
  const updateData = await handlePostUpdate(ctx.query.id, ctx.request.body);
  if(updateData) {
    ctx.body = new SuccessModel(updateData);
  } else {
    ctx.body = new ErrorModel('update err');
  }
});

router.post('/del', loginCheck, async (ctx, next) => {
  
  const author = ctx.session.username;
  const delData = await handlePostDel(ctx.query.id, author);
  if(delData) {
    ctx.body = new SuccessModel(delData);
  } else {
    ctx.body = new ErrorModel('del err');
  }
});


module.exports = router
