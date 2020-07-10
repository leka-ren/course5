const jwt = require('jsonwebtoken');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const cookieToken = req.headers.cookie.replace('jwt=', '');
  if (!cookieToken) {
    return res.status(401).send({ message: 'Need to login' });
  }

  let payload;
  try {
    payload = jwt.verify(cookieToken, 'qscwdvefb10537');
  } catch (err) {
    return res.status(401).send({ message: 'Need to login' });
  }

  req.user = payload;
  next();
};
