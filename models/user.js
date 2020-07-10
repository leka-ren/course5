const mongoose = require('mongoose');
const valid = require('validator');
const regex = require('../regExp/urlValid');

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
      validator: (str) => regex.test(str),
    },
    required: true,
  },
  email: {
    type: String,
    validate: {
      validator: (str) => valid.isEmail(str),
    },
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
});

module.exports = mongoose.model('user', userSchema);
