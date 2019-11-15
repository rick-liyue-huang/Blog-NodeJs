
/**
 * @description environment variable
 * @author rick
 */

const ENV = process.env.NODE_ENV

module.exports = {
  isDev: 'dev' === ENV,
  notDev: 'dev' !== ENV,
  isPrd: 'production' === ENV,
  notPrd: 'production' !== ENV,
  isTest: 'test' === ENV
}