
/**
 * @description config environment variables
 * @author Rick
 */

const ENV = process.env.NODE_ENV;

module.exports = {
  isDev: 'dev' === ENV,
  notDev: 'dev' !== ENV,
  isProd: 'production' === ENV,
  notProd: 'production' !== ENV,
  isTest: 'test' === ENV,
  notTest: 'test' !== ENV
}

