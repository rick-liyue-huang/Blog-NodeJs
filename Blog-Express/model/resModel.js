
// set return data format in model
class BaseModel {
  constructor(data, message) {
    // compatible with one arg
    if(typeof data === 'string') {
      this.message = data;
      data = null;
      message = null;
    }
    if(data) {
      this.data = data;
    }
    if(message) {
      this.message = message
    }
  }
}

// inerit from BaseModel
class SuccessModel extends BaseModel {
  constructor(data, message) {
    super(data, message);
    this.errno = 0;
  }
}

class ErrorModel extends BaseModel {
  constructor(data, message) {
    super(data, message);
    this.errno = -1;
  }
}

module.exports = { SuccessModel, ErrorModel };
