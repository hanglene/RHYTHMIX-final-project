// error.js
class CustomError extends Error {
    constructor(status, message) {
      super(message);
      this.status = status;
    }
  }
  
  const CreateError = (status, message) => new CustomError(status, message);
  
  module.exports = { CreateError };
  