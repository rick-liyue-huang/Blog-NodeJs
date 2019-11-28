
/**
 * @description json schema validation mehtod
 * @author Rick
 */

 const Ajv = require('ajv');
 const ajv = new Ajv({
  //  allErrors: true //ouput all errors(slow)
 });

 /**
  * 
  * @param {Object} schema json schema rules
  * @param {Object} data user data
  */
 function validate(schema, data = {}) {
  const valid = ajv.validate(schema, data);
  if(!valid) {
    return ajv.errors[0];
  }
 }

 module.exports = validate;