const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    validate: {
      // eslint-disable-next-line no-useless-escape
      validator: (str) => /(^https?:\/\/)?[a-z0-9~_\-\.]+\.[a-z]{1,9}[aA-zZ0-9~_\-\.\/?=&]+/.test(str),
    },
    required: true,
  },
});

module.exports = mongoose.model('user', userSchema);
