const express = require('express');

const { json } = require('body-parser');

const mongoose = require('mongoose');

const app = express();

// const path = require('path');

const { PORT = 3000 } = process.env;
const baseUrl = 'mongodb://localhost:27017/mestodb';

app.use(json());

app.use((req, res, next) => {
  req.user = {
    _id: '5ef50a952d467b7a9ed6540a',
  };

  next();
});
app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

mongoose.connect(`${baseUrl}`, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.listen(PORT, () => {
  console.log(`Server started, listening on ${PORT}`);
});
