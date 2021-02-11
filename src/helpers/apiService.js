const axios = require('axios');
const { myCache } = require('./cache');
const { getTokenValidTime } = require('./get-token-valid-time');

const {
  CLIENTS_ENDPOINT,
  POLICIES_ENDPOINT,
  CLIENT_ID,
  CLIENT_SECRET,
  AUTHENTICATION_ENDPOINT,
} = process.env;

async function renewInsuranceToken() {
  try {
    const token = await axios.post(AUTHENTICATION_ENDPOINT, {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
    });

    const validTill = getTokenValidTime(token.data.token);

    myCache.set('insurance_token', token.data, validTill);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
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
