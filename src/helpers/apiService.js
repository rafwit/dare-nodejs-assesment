const axios = require('axios');
const jwt = require('jsonwebtoken');
const { myCache } = require('./cache');

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
  const decoded = jwt.decode(token.data.token, { complete: true });
  myCache.set(
    'insurance_token',
    token.data,
    `${decoded.payload.exp - decoded.payload.iat}`
  );
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
