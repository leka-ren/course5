const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    validate: {
      // eslint-disable-next-line no-useless-escape
      validator: (str) => /(^https?:\/\/)?[a-z0-9~_\-\.]+\.[a-z]{1,9}[aA-zZ0-9~_\-\.\/?=&]+/.test(str),
    },
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }], // ??
    default: [],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model('card', cardSchema);
