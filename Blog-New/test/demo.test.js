
/** 
 * @description jest test demo
 * @author rick
 */

 function sum(a, b) {
   return a + b;
 }
 test('10 add 10 equal to 20', () => {
   const res = sum(10, 10);
   expect(res).toBe(20);
   
 });