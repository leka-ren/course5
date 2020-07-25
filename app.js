require('dotenv').config();

const express = require('express');

const { json } = require('body-parser');

const mongoose = require('mongoose');

const { celebrate, Joi, errors } = require('celebrate');

const { login, createUser } = require('./controllers/users');

const app = express();

const auth = require('./middlewares/auth');

const regexUrl = require('./regExp/urlValid');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3042 } = process.env;
const baseUrl = 'mongodb://localhost:27017/mestodb';

app.use(json());

mongoose.connect(baseUrl, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(requestLogger);

app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }),
  login,
);

app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().required().min(2).max(30),
      avatar: Joi.string().required().regex(regexUrl),
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }),
  createUser,
);

app.use(auth);

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use((req, res, next) => {
  const err = new Error('404 has not found');
  err.statusCode = 404;
  next(err);
});

app.use(errorLogger);

app.use(errors());

app.use((err, req, res) => {
  res.status(err.statusCode).send(err);
});

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Server started, listening on ${PORT}`));
