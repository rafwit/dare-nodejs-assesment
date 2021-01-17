const axios = require('axios');
require('dotenv').config();

const { CLIENT_ID, CLIENT_SECRET, AUTHENTICATION_ENDPOINT } = process.env;

async function loginUser(_req, res) {
  try {
    const result = await axios.post(AUTHENTICATION_ENDPOINT, {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
    });
    res.status(200).send(result.data);
  } catch (error) {
    res.send({
      code: error.response.data.statusCode,
      message: error.response.data.message,
    });
  }
}

module.exports = { loginUser };
