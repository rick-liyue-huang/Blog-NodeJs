
const _ = require('lodash');
const { add, mul } = require('./a');

const sum = add(10 ,20);
const prod = mul(10, 20);

console.log(sum);
console.log(prod);

const arr = _.concat([1, 2], 3);
console.log('arr:', arr);