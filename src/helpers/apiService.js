const axios = require('axios');
const { myCache } = require('./cache');
require('dotenv').config();

const {
  CLIENTS_ENDPOINT,
  POLICIES_ENDPOINT,
  CLIENT_ID,
  CLIENT_SECRET,
  AUTHENTICATION_ENDPOINT,
} = process.env;

async function renewInsuranceToken() {
  const token = await axios.post(AUTHENTICATION_ENDPOINT, {
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
  });
  myCache.set('insurance_token', token.data, 560);
}

async function fetchAllClients(type, token) {
  const clients = await axios.get(CLIENTS_ENDPOINT, {
    headers: {
      Authorization: `${type} ${token}`,
    },
  });
  return clients;
}

async function fetchAllPolicies(type, token) {
  const policies = await axios.get(POLICIES_ENDPOINT, {
    headers: {
      Authorization: `${type} ${token}`,
    },
  });
  return policies;
}

module.exports = {
  fetchAllClients,
  fetchAllPolicies,
  renewInsuranceToken,
};
