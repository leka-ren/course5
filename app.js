const express = require('express');

const { json } = require('body-parser');

const mongoose = require('mongoose');

const app = express();

const { PORT = 3000 } = process.env;
const baseUrl = 'mongodb://localhost:27017/mestodb';

app.use(json());

mongoose.connect(baseUrl, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use((req, res, next) => {
  req.user = { _id: '5ef5bc2383593d8ea79dc611' };

  next();
});
app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.listen(PORT, () => {
  console.log(`Server started, listening on ${PORT}`);
});
