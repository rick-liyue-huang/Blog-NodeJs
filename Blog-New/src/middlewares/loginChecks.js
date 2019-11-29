
/**
 * @description login check middleware
 * @author Rick
 */
const { ErrorModel } = require('../model/ResModel');
const { loginCheckFailInfo } = require('../model/ErrorInfo');
/**
* API login check
* @param {Object} ctx 
* @param {function} next 
*/
async function loginCheck(ctx, next) {
  if(ctx.session && ctx.session.userInfo) {
    // its already login
    await next();
    return
  }
  // unlogin
  ctx.body = new ErrorModel(loginCheckFailInfo);

}

/**
 * page login check
 * @param {Object} ctx 
 * @param {function} next 
 */
async function loginRedirect(ctx, next) {
  if(ctx.session && ctx.session.userInfo) {
    // its already login
    await next();
    return
  }
  // unlogin
  const curUrl = ctx.url;
  // match with var redirectUrl = $.query.get('url') || '/'
  ctx.redirect('/login?url=' + encodeURIComponent(curUrl));
}

module.exports = {
  loginCheck, loginRedirect
}