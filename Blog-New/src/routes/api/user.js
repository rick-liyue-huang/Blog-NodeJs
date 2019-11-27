
/**
 * @description user API router
 * @author Rick
 */

const router = require('koa-router')();
const { isExist } = require('../../controllers/user');

router.prefix('/api/user');

// register router
router.post('/register', async (ctx, next) => {

});

// username is exist router
router.post('/isExist', async (ctx, next) => {

  const { userName } = ctx.request.body;
  console.log('userName: ', userName);
  // apply controller methods
  ctx.body = await isExist(userName);

});

module.exports = router;


