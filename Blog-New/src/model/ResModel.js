
/**
 * @description response data model
 * @author Rick
 */

/**
 * @description base model
 */
class BaseModel {
  constructor({errno, data, message}) {
    this.errno = errno;
    if(data) {
      this.data = data;
    }
    if(message) {
      this.message = message;
    }
  }
}


/**
 * @description success model
 */
class SuccessModel extends BaseModel {
  constructor(data={}) {
    super({
      errno: 0,
      data
    })
  }
}


/**
 * error model
 */
class ErrorModel extends BaseModel {
  constructor({ errno, message }) {
    super({
      errno,
      message
    })
  }
}

module.exports = {
  SuccessModel, ErrorModel
}

