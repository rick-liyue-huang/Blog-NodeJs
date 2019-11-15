
const { Blog, User } = require('./model');

!(async function() {

  const updateRes = await User.update({
    nickName: 'liyue'
  }, {
    where: {
      userName: 'rick'
    }
  });

  console.log(updateRes[0] > 0); // [1]

})()