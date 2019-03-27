
const router = require('koa-router')();
const { SuccessModel, ErrorModel } = require('../model/resModel');
const {
  handleGetBlogList,
  handleGetBlogDetail,
  handlePostBlogNew,
  handlePostBlogUpdate,
  handlePostBlogDel
} = require('../controller/blog');
const loginCheck = require('../middlewares/loginCheck');

router.prefix('/api/blog');

router.get('/list', async (ctx, nect) => {
  
  let author = ctx.query.author || '';
  const keyword = ctx.query.keyword || '';

  // confirm whether it is logined or not
  if(ctx.query.isadmin) {
    console.log('is admin'); // log
    if(ctx.session.username == null) {
      console.log('is not login');
      ctx.body = new ErrorModel('unlogin blog-list');
      return
    }
    author = ctx.session.username;
  }
  
  // get promise
  const listData = await handleGetBlogList(author, keyword);
  if(listData) {
    ctx.body = new SuccessModel(listData);
  } else {
    ctx.body = new ErrorModel('list fail')
  }
  
});

router.get('/detail', async (ctx, next) => {
  
  const id = ctx.query.id;
  const detailData = await handleGetBlogDetail(id);
  if(detailData.id) {
    ctx.body = new SuccessModel(detailData);
  } else {
    ctx.body = new ErrorModel('detail fail')
  }
  
});

router.post('/new', loginCheck, async (ctx, next) => {

  const body = ctx.request.body
  body.author = ctx.session.username;
  const newData = await handlePostBlogNew(ctx.request.body);
  if(newData) {
    ctx.body = new SuccessModel(newData);
  } else {
    ctx.body = new ErrorModel('new fail')
  }
  
});

router.post('/update', loginCheck, async (ctx, next) => {

  const updateData = await handlePostBlogUpdate(ctx.query.id, ctx.request.body);
  if(updateData) {
    ctx.body = new SuccessModel(updateData)
  } else {
    ctx.body = new ErrorModel('update fail')
  }
  
});

router.post('/del', loginCheck, async (ctx, next) => {

  const author = ctx.session.username;
  const delData = await handlePostBlogDel(ctx.query.id, author);
  if(delData) {
    ctx.body = new SuccessModel(delData);
  } else {
    ctx.body = new ErrorModel('del fail');
  }
  
});


module.exports = router;