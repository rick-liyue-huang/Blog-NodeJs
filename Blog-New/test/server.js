
/**
 * @description jest server
 * @author Rick
 */

 const request = require('supertest');
//  match with 'var server = http.createServer(app.callback());'
 const serverHandler = require('../src/app').callback();

 module.exports = request(serverHandler);

