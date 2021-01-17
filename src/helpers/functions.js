/* eslint-disable no-param-reassign */
const axios = require('axios');
require('dotenv').config();

const { CLIENTS_ENDPOINT, POLICIES_ENDPOINT } = process.env;

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

function addPoliciesToClients(clients, policies) {
  if (clients.data.length > 1) {
    clients = clients.data;
  }

  return clients.map((client) => {
    client.policies = [];
    policies.data.map((policy) => {
      if (client.id === policy.clientId) {
        client.policies.push({
          id: policy.id,
          amountInsured: policy.amountInsured,
          inceptionDate: policy.inceptionDate,
        });
      }
      return client.policies;
    });
    return client;
  });
}

function addPoliciesToClient(clients, policies) {
  return clients.map((client) => {
    client.policies = [];
    policies.data.map((policy) => {
      if (client.id === policy.clientId) {
        client.policies.push({
          id: policy.id,
          amountInsured: policy.amountInsured,
          inceptionDate: policy.inceptionDate,
        });
      }
      return client.policies;
    });
    return client;
  });
}

function handleError(response, error) {
  if (error.response) {
    response.status(error.response.data.statusCode).send({
      code: error.response.data.statusCode,
      message: error.response.data.message,
    });
  } else {
    // eslint-disable-next-line no-console
    console.log(error);
    response.status(404).send('Something went wrong');
  }
}

module.exports = {
  fetchAllClients,
  fetchAllPolicies,
  addPoliciesToClients,
  handleError,
  addPoliciesToClient,
};
