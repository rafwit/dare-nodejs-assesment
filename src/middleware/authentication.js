/* eslint-disable no-console */
const axios = require('axios');
require('dotenv').config();

const { CLIENT_ID, CLIENT_SECRET, AUTHENTICATION_ENDPOINT } = process.env;

function authenticateUser() {
  return axios
    .post(AUTHENTICATION_ENDPOINT, {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
    })
    .catch((error) => console.log(error));
}

module.exports = { authenticateUser };
