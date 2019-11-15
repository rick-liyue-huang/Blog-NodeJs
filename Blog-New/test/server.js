
/**
 * @description jest server
 * @author rick
 */

 const request = require('supertest');
 const server = require('../src/app').callback();

 module.exports = request(server);

