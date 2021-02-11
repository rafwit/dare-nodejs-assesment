const jwt = require('jsonwebtoken');

module.exports.getTokenValidTime = (token) => {
  const timeNow = Date.now();
  const { exp } = jwt.decode(token);

  return Math.floor((exp * 1000 - timeNow) / 1000);
};
