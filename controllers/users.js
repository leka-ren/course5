// eslint-disable-next-line quotes
require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFound = require('../customErrors/notFound');
const BadRequest = require('../customErrors/badRequest');
const Unauthorized = require('../customErrors/unauthorized');
const AlradyRegistred = require('../customErrors/alradyRegistred');

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, process.env.NODE_ENV === 'prod' ? process.env.JWT_SECRET : 'dev-secret', {
        expiresIn: '7d',
      });
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
      });
      res.status(200).send({ message: 'Authentication was successful' });
    })
    // eslint-disable-next-line no-unused-vars
    .catch((e) => {
      next(new Unauthorized(e.message));
    });
};

module.exports.createUser = (req, res, next) => {
  // eslint-disable-next-line object-curly-newline
  const { name, about, avatar, email, password } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => {
      User.create({
        name,
        about,
        avatar,
        email,
        password: hash,
      })
        .then(() => {
          res.status(200).send({ message: 'You are registered!' });
        })
        .catch((e) => {
          if (e.name === 'ValidationError') {
            next(new BadRequest(`${e}`));
          } else {
            next(new AlradyRegistred('User already registered'));
          }
        });
    })
    .catch(next);
};

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).send({ data: users }))
    .catch(next);
};

module.exports.getUsersById = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      if (user !== null) {
        res.status(200).send({ data: user });
      } else {
        next(new NotFound('User has not found'));
      }
    })
    .catch(next);
};

module.exports.patchUser = (req, res, next) => {
  const owner = req.user._id;

  User.findByIdAndUpdate(
    owner,
    { ...req.body },
    { new: true, runValidators: true },
  )
    .then((user) => res.status(200).send({ data: user }))
    .catch(next);
};

module.exports.patchAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const owner = req.user;

  User.findByIdAndUpdate(
    owner,
    { avatar },
    { new: true, runValidators: true },
  )
    .then((user) => res.status(200).send({ data: user }))
    .catch(next);
};
