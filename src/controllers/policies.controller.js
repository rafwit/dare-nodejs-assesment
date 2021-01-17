const {
  handleError,
  fetchAllPolicies,
  fetchAllClients,
  addPoliciesToClient,
} = require('../helpers/functions');

async function getAllPolicies(req, res) {
  const { limit = 10 } = req.query;
  const [type, token] = req.headers.authorization.split(' ');

  try {
    const policies = await fetchAllPolicies(type, token);
    const result = policies.data.map((policy) => {
      // eslint-disable-next-line no-param-reassign
      delete policy.clientId;
      return policy;
    });

    res.status(200).send(result.slice(0, limit));
  } catch (error) {
    handleError(res, error);
  }
}

async function getPolicyClientDetails(req, res) {
  const { id } = req.params;
  const [type, token] = req.headers.authorization.split(' ');

  try {
    const clients = await fetchAllClients(type, token);
    const policies = await fetchAllPolicies(type, token);
    const searchedPolicy = policies.data.filter((policy) => policy.id === id);
    // console.log(clients.data);
    const clientDetailsWithoutPolicies = clients.data.filter(
      (client) => client.id === searchedPolicy[0].clientId
    );

    const result = addPoliciesToClient(clientDetailsWithoutPolicies, policies);
    res.status(200).send(result);
  } catch (error) {
    handleError(res, error);
  }
}

module.exports = { getAllPolicies, getPolicyClientDetails };
