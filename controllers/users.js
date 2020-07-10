// eslint-disable-next-line quotes
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports.login = (req, res) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'qscwdvefb10537', {
        expiresIn: '7d',
      });
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
      });
      res.status(200).send({ message: 'Аутентификация прошла успешно' });
    })
    .catch(() => {
      res.status(401).send({ message: 'Неправильные почта или пароль' });
    });
};

module.exports.createUser = (req, res) => {
  // eslint-disable-next-line object-curly-newline
  const { name, about, avatar, email, password } = req.body;

  bcrypt
    .hash(password, 10)
    .then(() => {
      User.create({
        name,
        about,
        avatar,
        email,
      })
        .then((user) => {
          res.status(200).send({ data: user });
        })
        .catch((err) => res.status(400).send({ message: err.message }));
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send({ data: users }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.getUsersById = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (user !== null) {
        res.status(200).send({ data: user });
      } else {
        res.status(404).send({ message: 'user has not found' });
      }
    })
    .catch((err) => res.status(404).send({ message: err.message }));
};

module.exports.patchUser = (req, res) => {
  const { name, about } = req.body;
  const owner = req.user;

  User.findByIdAndUpdate(owner, { name, about }, { new: true })
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.patchAvatar = (req, res) => {
  const { avatar } = req.body;
  const owner = req.user;

  User.findByIdAndUpdate(owner, { avatar }, { new: true })
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => res.status(500).send({ message: err.message }));
};
