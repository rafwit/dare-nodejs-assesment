const axios = require('axios');
require('dotenv').config();

// const { authenticateUser } = require('../middleware/authentication');

const { CLIENTS_ENDPOINT, POLICIES_ENDPOINT } = process.env;

async function retrieveAllClients(req, res) {
  const { limit = 10, name = undefined } = req.query;
  const [type, token] = req.headers.authorization.split(' ');

  try {
    const clients = await axios.get(CLIENTS_ENDPOINT, {
      headers: {
        Authorization: `${type} ${token}`,
      },
    });

    const policies = await axios.get(POLICIES_ENDPOINT, {
      headers: {
        Authorization: `${type} ${token}`,
      },
    });
    const resultNotFilteredByName = clients.data.map((client) => {
      // eslint-disable-next-line no-param-reassign
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

    // filtering by name if provided

    if (name) {
      const resultFilteredByName = resultNotFilteredByName.filter(
        (client) => client.name === name
      );
      res.status(200).send(resultFilteredByName.slice(0, limit));
    } else {
      res.status(200).send(resultNotFilteredByName.slice(0, limit));
    }
  } catch (error) {
    res.status(401).send({
      code: 401,
      message: error,
    });
  }
}

// async function getClientsById(req, res) {}

module.exports = { retrieveAllClients };
