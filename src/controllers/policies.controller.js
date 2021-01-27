/* eslint-disable no-param-reassign */
const {
  addPoliciesToClient,
  provideInsuranceToken,
} = require('../helpers/functions');
const { fetchAllClients, fetchAllPolicies } = require('../helpers/apiService');

async function getAllPolicies(req, res, next) {
  const { limit = 10 } = req.query;
  // eslint-disable-next-line no-unused-vars
  const [_, userRole, userId] = req.user;

  try {
    const insuranceToken = await provideInsuranceToken();
    const policies = await fetchAllPolicies(
      insuranceToken.type,
      insuranceToken.token
    );

    if (userRole === 'admin') {
      const result = policies.data.map((policy) => {
        delete policy.clientId;
        return policy;
      });

      res.status(200).send(result.slice(0, limit));
    } else {
      const result = policies.data
        .filter((policy) => policy.clientId === userId)
        .map((policy) => {
          delete policy.clientId;
          return policy;
        });
      res.status(200).send(result.slice(0, limit));
    }
  } catch (error) {
    next(error);
  }
}

async function getPolicyClientDetails(req, res, next) {
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
      const clients = await fetchAllClients(
        insuranceToken.type,
        insuranceToken.token
      );
      const policies = await fetchAllPolicies(
        insuranceToken.type,
        insuranceToken.token
      );
      const searchedPolicy = policies.data.filter((policy) => policy.id === id);
      if (searchedPolicy.length === 0) {
        res.status(404).send({ code: 404, message: 'Resource not found' });
      } else {
        const clientDetailsWithoutPolicies = clients.data.filter(
          (client) => client.id === searchedPolicy[0].clientId
        );

        const result = addPoliciesToClient(
          clientDetailsWithoutPolicies,
          policies
        );
        res.status(200).send(result);
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = { getAllPolicies, getPolicyClientDetails };
