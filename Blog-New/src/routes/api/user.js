
/**
 * @description user API router
 * @author Rick
 */

const router = require('koa-router')();
const { isExist, register, login, deleteCurrentUser } = require('../../controllers/user');
const userValidate = require('../../validator/user');
const { genValidator } = require('../../middlewares/validator');
const { isTest } = require('../../utils/env');
const { loginCheck } = require('../../middlewares/loginChecks');

router.prefix('/api/user');

// register user router
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

// login user router
router.post('/login', async (ctx, next) => {
  const { userName, password } = ctx.request.body;
  // apply controller mehtod
  ctx.body = await login(ctx, userName, password);
});

// delete user router
router.post('/delete', loginCheck, async (ctx, next) => {
  // only valid on the test environment
  if(isTest) {
    // 测试环境下，测试登录账号后删除自己，
    const { userName } = ctx.session.userInfo;
    // apply controller
    ctx.body = await deleteCurrentUser(userName);
  }
})

module.exports = router;


