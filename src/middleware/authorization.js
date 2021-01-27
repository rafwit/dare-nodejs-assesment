const jwt = require('jsonwebtoken');
const { myCache } = require('../helpers/cache');

const SECRET_KEY = process.env.SECRET_KEY || 'lalala this isnt secure';

function authorizeUser(req, _, next) {
  const token = req.headers.authorization.split(' ')[1];

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = myCache.get(decoded.username).split(' ');
    next();
  } catch (error) {
    throw new Error('Invalid token! Please login.');
  }
}

module.exports = { authorizeUser };
