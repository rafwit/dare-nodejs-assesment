const axios = require('axios');
require('dotenv').config();
const { handleError } = require('../helpers/functions');

const { CLIENT_ID, CLIENT_SECRET, AUTHENTICATION_ENDPOINT } = process.env;

async function loginUser(_req, res) {
  try {
    const result = await axios.post(AUTHENTICATION_ENDPOINT, {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
    });
    res.status(200).send(result.data);
  } catch (error) {
    handleError(res, error);
  }
}

module.exports = { loginUser };
