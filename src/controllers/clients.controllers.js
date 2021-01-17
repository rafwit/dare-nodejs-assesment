const {
  fetchAllClients,
  fetchAllPolicies,
  addPoliciesToClients,
  addPoliciesToClient,
  handleError,
} = require('../helpers/functions');

async function getAllClients(req, res) {
  const { limit = 10, name = undefined } = req.query;
  const [type, token] = req.headers.authorization.split(' ');

  try {
    const clients = await fetchAllClients(type, token);
    const policies = await fetchAllPolicies(type, token);
    const resultNotFilteredByName = addPoliciesToClients(clients, policies);

    if (name) {
      const resultFilteredByName = resultNotFilteredByName.filter(
        (client) => client.name === name
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
  const [type, token] = req.headers.authorization.split(' ');

  try {
    const clients = await fetchAllClients(type, token);
    const policies = await fetchAllPolicies(type, token);
    const clientFilteredById = clients.data.filter(
      (client) => client.id === id
    );

    const result = addPoliciesToClient(clientFilteredById, policies);
    res.status(200).send(result);
  } catch (error) {
    handleError(res, error);
  }
}

async function getClientPoliecies(req, res) {
  const { id } = req.params;
  const [type, token] = req.headers.authorization.split(' ');

  try {
    const policies = await fetchAllPolicies(type, token);
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

module.exports = { getAllClients, getClientsById, getClientPoliecies };
