const axios = require('axios');
const { authenticateUser } = require('../middleware/authentication');

async function retrieveAllClients() {
  const auth = await authenticateUser();
  const clients = await axios.get(
    'https://dare-nodejs-assessment.herokuapp.com/api/clients',
    {
      headers: {
        Authorization: `${auth.data.type} ${auth.data.token}`,
      },
    },
  );
  return clients;
}

async function getAllClients(req, res) {
  // todo add pagination and limit to 10 by default, and optional filter by name
  const result = await retrieveAllClients();
  // console.log(result.data);
  res.status(200).send(result.data);
}

module.exports = { getAllClients };
