const ApplicationError = require('./ApplicationError');

class ExpiredToken extends ApplicationError{
  constructor (message) {
    super(message || 'token expired', 408);
  }
}

module.exports = ExpiredToken;
