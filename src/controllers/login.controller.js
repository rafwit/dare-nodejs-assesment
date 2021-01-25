const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY || 'lalala this isnt secure';
const {
  renewInsuranceToken,
  fetchAllClients,
} = require('../helpers/apiService');

const {
  handleError,
  checkIfClientExistAndVerifyRole,
} = require('../helpers/functions');

const { myCache } = require('../helpers/cache');

async function authenticateUser(req, res) {
  const { username } = req.body;
  let insuranceToken = myCache.get('insurance_token');
  if (insuranceToken === undefined) {
    await renewInsuranceToken();
    insuranceToken = myCache.get('insurance_token');
  }
  try {
    const clients = await fetchAllClients(
      insuranceToken.type,
      insuranceToken.token
    );
    const user = checkIfClientExistAndVerifyRole(clients.data, username);

    if (!user) {
      res.status(400).send({ code: 400, message: 'User not found' });
    } else {
      const userToken = jwt.sign({ username }, SECRET_KEY);
      myCache.set(username, `${user.role} ${user.id}`);
      res
        .status(200)
        .send({ token: userToken, type: 'Bearer', expires_in: 560 });
    }
  } catch (error) {
    handleError(res, error);
  }
}

module.exports = { authenticateUser };
