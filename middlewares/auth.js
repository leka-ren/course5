const jwt = require('jsonwebtoken');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  if (req.headers.cookie) {
    const cookieToken = req.headers.cookie.replace('jwt=', '');

    let payload;
    try {
      payload = jwt.verify(cookieToken, 'qscwdvefb10537');
    } catch (e) {
      const err = new Error('Need to login');
      err.statusCode = 401;
      next(err);
    }
    req.user = payload;
  } else {
    const err = new Error('Need to login');
    err.statusCode = 401;
    next(err);
  }
  next();
};
