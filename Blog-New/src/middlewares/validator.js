
/**
 * @description json schema validation middleware
 * @author Rick
 */
const { ErrorModel } = require('../model/ResModel');
const { jsonSchemaFileInfo } = require('../model/ErrorInfo');
 /**
  * generate json schema validation middleware
  * @param {function} validateFn
  */
function genValidator(validateFn) {
  async function validator(ctx, next) {
    // validator
    const data = ctx.request.body;
    const err =  validateFn(data);
    if(err) {
      // validate fail
      ctx.body = new ErrorModel(jsonSchemaFileInfo);
      return
    }
    await next();
  }
  return validator;
}

module.exports = { genValidator }