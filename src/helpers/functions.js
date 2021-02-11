/* eslint-disable no-param-reassign */
const { renewInsuranceToken } = require('./apiService');
const { myCache } = require('./cache');

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

module.exports = {
  addPoliciesToClients,
  addPoliciesToClient,
  checkIfClientExistAndVerifyRole,
  provideInsuranceToken,
};
