
/**
 * @description user API router
 * @author Rick
 */

const router = require('koa-router')();
const { isExist, register } = require('../../controllers/user');
const userValidate = require('../../validator/user');
const { genValidator } = require('../../middlewares/validator');

router.prefix('/api/user');

// register router
router.post('/register', genValidator(userValidate), async (ctx, next) => {
  const { userName, password, gender } = ctx.request.body;
  console.log('userName, password, gender', userName, password, gender);
  // apply controller methods
  ctx.body = await register({userName, password, gender});
});

// username is exist router
router.post('/isExist', async (ctx, next) => {

  const { userName } = ctx.request.body;
  console.log('userName: ', userName);
  // apply controller methods
  ctx.body = await isExist(userName);

});

module.exports = router;


