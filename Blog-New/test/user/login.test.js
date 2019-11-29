
/**
 * @description user api test
 * @author Rick
 */

 const server = require('../server');

//  user info
const userName = `u_${Date.now()}`;
const password = `p_${Date.now()}`;
const testUser = {
  userName, 
  password,
  nickName: userName,
  gender: 1
};

// store cookie
let COOKIE = '';

// register
test('register user successfully', async () => {
  const res = await server
    .post('/api/user/register')
    .send(testUser);
  expect(res.body.errno).toBe(0);
});

// register repeatly
test('register repeatly fail', async () => {
  const res = await server
    .post('/api/user/register')
    .send(testUser);
  expect(res.body.errno).not.toBe(0);
});

// query the user is exist or not
test('query the user should exist', async () => {
  const res = await server
    .post('/api/user/isExist')
    .send({ userName });
  expect(res.body.errno).toBe(0);
});

// json schema check
test('json schema validation not successfully', async () => {
  const res = await server
    .post('/api/user/register')
    .send({
      userName: '123', // invalide
      password: 'a', // length > 3
      // nickName,
      gender: 'ok'
    });
  expect(res.body.errno).not.toBe(0);
});

// check login
test('login successfully', async () => {
  const res = await server
   .post('/api/user/login')
   .send({
     userName,
     password
   });
  expect(res.body.errno).toBe(0);

  // check its cookie
  COOKIE = res.headers['set-cookie'].join(';');

});

// test delete
test('delete user successfully', async () => {
  const res = await server
    .post('/api/user/delete')
    .set('cookie', COOKIE) // 通过cookie找到自己的信息
  expect(res.body.errno).toBe(0);
});

// test the user is not exist
test('check the username sould not exist', async () => {
  const res = await server
    .post('/api/user/isExist')
    .send({ userName });
  expect(res.body.errno).not.toBe(0);
});


