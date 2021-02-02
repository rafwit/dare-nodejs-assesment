const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const { myCache } = require('../helpers/cache');

const SECRET_KEY = process.env.SECRET_KEY || 'lalala this isnt secure';

function authorizeUser(req, res, next) {
  const token = req.headers.authorization.split(' ')[1];
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = myCache.get(decoded.username).split(' ');
    next();
  } catch (error) {
    next(
      createError(401, {
        code: 401,
        message: `Invalid token, please login.`,
      })
    );
  }
}

module.exports = { authorizeUser };
