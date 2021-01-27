const { fetchAllClients, fetchAllPolicies } = require('../helpers/apiService');

const {
  addPoliciesToClients,
  addPoliciesToClient,
  handleError,
  provideInsuranceToken,
} = require('../helpers/functions');

async function getAllClients(req, res) {
  const { limit = 10 } = req.query;
  let { name = undefined } = req.query;

  const [username, userRole] = req.user;

  try {
    const insuranceToken = await provideInsuranceToken();

    if (userRole === 'user') name = username;

    const clients = await fetchAllClients(
      insuranceToken.type,
      insuranceToken.token
    );
    const policies = await fetchAllPolicies(
      insuranceToken.type,
      insuranceToken.token
    );
    const resultNotFilteredByName = addPoliciesToClients(clients, policies);
    if (name !== undefined) {
      const resultFilteredByName = resultNotFilteredByName.filter(
        (client) => client.name === name || client.email === name
      );
      res.status(200).send(resultFilteredByName.slice(0, limit));
    } else {
      res.status(200).send(resultNotFilteredByName.slice(0, limit));
    }
  } catch (error) {
    handleError(res, error);
  }
}

async function getClientsById(req, res) {
  const { id } = req.params;
  const [username, userRole] = req.user;

  try {
    const insuranceToken = await provideInsuranceToken();

    const clients = await fetchAllClients(
      insuranceToken.type,
      insuranceToken.token
    );
    const policies = await fetchAllPolicies(
      insuranceToken.type,
      insuranceToken.token
    );

    const clientFilteredById = clients.data.filter(
      (client) => client.id === id
    );

    if (userRole === 'user' && clientFilteredById[0].email !== username) {
      res.status(403).send({
        code: 403,
        message: "You don't have permission to access this resource",
      });
    } else {
      const result = addPoliciesToClient(clientFilteredById, policies);
      res.status(200).send(result);
    }
  } catch (error) {
    handleError(res, error);
  }
}

async function getClientPoliecies(req, res) {
  const { id } = req.params;
  // eslint-disable-next-line no-unused-vars
  const [_, userRole, userId] = req.user;

  if (userRole !== 'admin' && userId !== id) {
    res.status(403).send({
      code: 403,
      message: "You don't have permission to access this resource",
    });
  } else {
    try {
      const insuranceToken = await provideInsuranceToken();
      const policies = await fetchAllPolicies(
        insuranceToken.type,
        insuranceToken.token
      );
      const filteredPolicies = policies.data
        .filter((policy) => policy.clientId === id)
        .map((policy) => {
          // eslint-disable-next-line no-param-reassign
          delete policy.clientId;
          return policy;
        });
      res.status(200).send(filteredPolicies);
    } catch (error) {
      handleError(res, error);
    }
  }
}

module.exports = { getAllClients, getClientsById, getClientPoliecies };
