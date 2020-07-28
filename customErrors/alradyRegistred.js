const { Error } = require('mongoose');

class AlradyRegistred extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 409;
  }
}

module.exports = AlradyRegistred;
