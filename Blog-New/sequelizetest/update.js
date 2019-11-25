
const { Blog, User } = require('./model');

;(async function() {

  const updateResult = await User.update({
    nickName: 'leo666'
  }, {
    where: {
      userName: 'leo666'
    }
  })
  console.log('res: ', updateResult[0] > 0);
})();