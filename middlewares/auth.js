const jwt = require('jsonwebtoken');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  if (req.headers.cookie) {
    const cookieToken = req.headers.cookie.replace('jwt=', '');

    let payload;
    try {
      payload = jwt.verify(cookieToken, 'qscwdvefb10537');
    } catch (err) {
      return res.status(401).send({ message: 'Need to login' });
    }
    req.user = payload;
  } else {
    return res.status(401).send({ message: 'Need to login' });
  }
  next();
};
