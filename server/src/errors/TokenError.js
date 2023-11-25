const ApplicationError = require('./ApplicationError');

class TokenError extends ApplicationError{
  constructor (message) {
    super(message || 'Need token', 401);
  }
}

module.exports = TokenError;

