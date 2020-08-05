require('dotenv').config();
const jwt = require('jsonwebtoken');
const Unauthorized = require('../customErrors/unauthorized');

const errLogin = new Unauthorized('Need to login');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  if (req.headers.cookie) {
    const cookieToken = req.headers.cookie.replace('jwt=', '');

    let payload;
    try {
      payload = jwt.verify(cookieToken, process.env.NODE_ENV === 'prod' ? process.env.JWT_SECRET : 'dev-secret');
    } catch (e) {
      next(errLogin);
    }
    req.user = payload;
  } else {
    next(errLogin);
  }
  next();
};
