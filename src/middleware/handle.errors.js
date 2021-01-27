function handleError(error, _, response, next) {
  if (error.response) {
    response.status(error.response.data.statusCode).send({
      code: error.response.data.statusCode,
      message: error.response.data.message,
    });
  } else {
    next();
  }
}

module.exports = { handleError };
