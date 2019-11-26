
/**
 * @description json test
 * @author Rick
 */

 const server = require('./server');

 test('json interface correst', async () => {
  const res = await server.get('/json');
  expect(res.body).toEqual({
    title: 'koa2 json'
  });
  expect(res.body.title).toBe('koa2 json');

  // const res1 = await server.post('/login').send({
  //   username: 'aj',
  //   password: '456'
  // });
  // epect(res1.body.username).toBe('aj');
 });