
/** 
 * @description json test
 * @author rick
 */

 const server = require('./server');

 test('json interface return the the format correctly', async () => {
   const res = await server.get('/json');
   expect(res.body).toEqual({
    title: 'koa2 json'
   });
   expect(res.body.title).toBe('koa2 json')
 });

 /*
 test('json interface return the the format correctly', async () => {
  const res = await server.post('/login').send({
    userName: 'rick',
    password: '666'
  });
  expect(res.body).toEqual({
   title: 'koa2 json'
  });
  expect(res.body.title).toBe('koa2 json')
});
*/