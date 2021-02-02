const createError = require('http-errors');

// eslint-disable-next-line no-unused-vars
function handleError(error, _, __, ___) {
  throw createError(
    error.response.data.statusCode,
    `${error.response.data.message}`,
    {
      code: error.response.data.statusCode,
      message: error.response.data.message,
    }
  );
}

module.exports = { handleError };
