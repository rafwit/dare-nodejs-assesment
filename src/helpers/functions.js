/* eslint-disable no-param-reassign */
const jwt = require('jsonwebtoken');
const { renewInsuranceToken } = require('./apiService');
const { myCache } = require('./cache');

const SECRET_KEY = process.env.SECRET_KEY || 'lalala this isnt secure';

async function provideInsuranceToken() {
  let insuranceToken = myCache.get('insurance_token');

  if (insuranceToken === undefined) {
    await renewInsuranceToken();
    insuranceToken = myCache.get('insurance_token');
  }
  return insuranceToken;
}

function checkIfClientExistAndVerifyRole(clients, username) {
  const user = clients.filter((client) => client.email === username);
  if (user) return user[0];
  return false;
}

function authorizeUser(token) {
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const user = myCache.get(decoded.username).split(' ');

    return [decoded.username, ...user];
  } catch (error) {
    throw new Error('Invalid token!');
  }

  // return [decoded.username]
}

function addPoliciesToClients(clients, policies) {
  if (clients.data.length > 1) clients = clients.data;

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
  addPoliciesToClients,
  addPoliciesToClient,
  handleError,
  checkIfClientExistAndVerifyRole,
  authorizeUser,
  provideInsuranceToken,
};
