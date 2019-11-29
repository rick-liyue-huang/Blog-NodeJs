
/**
 * @description user model test
 * @author Rick
 */

const { User } = require('../../src/db/model/index');

test('User model all props satisfied with needs', () => {
  // build 构建一个内存的User实例，但是不会提交到数据库中
  const user = User.build({
    userName: 'rick',
    password: '666',
    nickName: 'rick',
    // gender: 1,
    picture: '/xxx.png',
    city: 'mel'
  });

  // verify the props
  expect(user.userName).toBe('rick');
  expect(user.password).toBe('666');
  expect(user.nickName).toBe('rick');
  expect(user.gender).toBe(3);
  expect(user.picture).toBe('/xxx.png');
  expect(user.city).toBe('mel');
});

